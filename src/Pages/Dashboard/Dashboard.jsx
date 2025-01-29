import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bed, BookmarkCheck, PackageOpen } from "lucide-react";
import SideBar from "../../Components/Side Bar/SideBar";

function Dashboard() {
    const navigate = useNavigate();
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalPackages, setTotalPackages] = useState(0);

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            // Redirect to login if no token is found
            navigate("/");
        }

        // Fetch the dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/dashboarddata", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
                const data = await response.json();
                setTotalRooms(data.totalRooms);
                setTotalPackages(data.totalPackages);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchDashboardData();
    }, [navigate]);

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3">
                <h2>Dashboard</h2>

                <div className="d-flex mt-5 gap-5" style={{ justifyContent: 'center', placeItems: 'center' }}>

                    <div className="card text-white bg-warning mb-3" style={{ width: "20rem", height: '10rem' }}>
                        <Link className="text- text-decoration-none" style={{ color: 'white' }} to="/booking">
                            <div className="card-header">Total Bookings</div>
                            <div className="card-body d-flex gap-5">
                                <BookmarkCheck size={90} />
                                <h4 className="card-title mt-2" style={{ fontSize: '60px' }}>80</h4>
                            </div>
                        </Link>
                    </div>

                    <div className="card text-white bg-info mb-3" style={{ width: "20rem", height: '10rem' }}>
                        <Link className="text- text-decoration-none" style={{ color: 'white' }} to="/rooms">
                            <div className="card-header">Total Rooms</div>
                            <div className="card-body d-flex gap-5">
                                <Bed size={90} />
                                <h4 className="card-title mt-2" style={{ fontSize: '60px' }}>{totalRooms}</h4>
                            </div>
                        </Link>
                    </div>

                    <div className="card text-white bg-dark mb-3" style={{ width: "20rem", height: '10rem' }}>
                        <Link className="text- text-decoration-none" style={{ color: 'white' }} to="/packages">
                            <div className="card-header">Total Packages</div>
                            <div className="card-body d-flex gap-5">
                                <PackageOpen size={90} />
                                <h4 className="card-title mt-2" style={{ fontSize: '60px' }}>{totalPackages}</h4>
                            </div>
                        </Link>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default Dashboard;

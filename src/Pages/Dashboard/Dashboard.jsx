import SideBar from "../../Components/Side Bar/SideBar";
import SecOne from "./Dashboard Sections/SecOne";
import SecTwo from "./Dashboard Sections/SecTwo";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Bed, BookmarkCheck, PackageOpen } from "lucide-react";
import API_BASE_URL from "../../API/apiConfig";

function Dashboard() {
    const navigate = useNavigate();
    const [totalRooms, setTotalRooms] = useState(0);
    const [totalPackages, setTotalPackages] = useState(0);
    const monthlyData = [
        { month: 'January', year: 2024, bookings: 120, profit: 5000, revenue: 20000 },
        { month: 'February', year: 2024, bookings: 150, profit: 7000, revenue: 25000 },
        { month: 'March', year: 2024, bookings: 180, profit: 8000, revenue: 28000 },
        { month: 'April', year: 2024, bookings: 200, profit: 9500, revenue: 32000 },
        { month: 'May', year: 2024, bookings: 170, profit: 8700, revenue: 29000 },
        { month: 'June', year: 2024, bookings: 220, profit: 11000, revenue: 35000 },
        { month: 'July', year: 2024, bookings: 250, profit: 12000, revenue: 37000 },
    ];

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            // Redirect to login if no token is found
            navigate("/");
            return; // Ensure we don't attempt to fetch data if not logged in
        }
    
        // Fetch the dashboard data
        const fetchDashboardData = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}dashboarddata`, {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                });
    
                if (!response.ok) {
                    // If response is not ok (e.g., token is invalid), log out the user
                    localStorage.removeItem("token");
                    navigate("/"); // Redirect to login
                    return;
                }
    
                const data = await response.json();
                setTotalRooms(data.totalRooms);
                setTotalPackages(data.totalPackages);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
                // Handle error (maybe display an error message to the user)
            }
        };
    
        fetchDashboardData();
    }, [navigate]);
    

    return (
        <div className="d-flex">
            <SideBar />
            <div className="flex-grow-1 p-3">
                <h2 style={{ paddingLeft: "50px" }}>Dashboard</h2>

                <div className="row mt-3">
                    <div className="col-md-12">
                        <SecOne
                            totalUsers={"80"}
                            totalBookings={totalRooms}
                            totalHotels={totalPackages}
                        />
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-md-16">
                        <SecTwo monthlyData={monthlyData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;

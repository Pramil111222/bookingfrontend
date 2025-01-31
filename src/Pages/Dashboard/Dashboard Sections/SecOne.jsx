import { Link } from "react-router-dom"
import { BookmarkCheck, Hotel, Users2 } from "lucide-react";

function SecOne({ totalUsers, totalBookings, totalHotels }) {
    return (
        <div className="row g-4 justify-content-center">
            <div className="col-md-3">
                <div className="card text-white bg-warning">
                    <Link
                        className="text-decoration-none"
                        style={{ color: "white" }}
                        to="/users"
                    >
                        <div className="card-header text-center">Total Users</div>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <Users2 size={70} />
                            <h4 className="card-title mb-0" style={{ fontSize: "60px" }}>
                                {totalUsers}
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-white bg-info">
                    <Link
                        className="text-decoration-none"
                        style={{ color: "white" }}
                        to="/rooms"
                    >
                        <div className="card-header text-center">Total Hotels</div>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <Hotel size={70} />
                            <h4 className="card-title mb-0" style={{ fontSize: "60px" }}>
                                {totalHotels}
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="col-md-3">
                <div className="card text-white bg-dark">
                    <Link
                        className="text-decoration-none"
                        style={{ color: "white" }}
                        to="/bookings"
                    >
                        <div className="card-header text-center">Total Bookings</div>
                        <div className="card-body d-flex align-items-center justify-content-between">
                            <BookmarkCheck size={70} />
                            <h4 className="card-title mb-0" style={{ fontSize: "60px" }}>
                                {totalBookings}
                            </h4>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SecOne
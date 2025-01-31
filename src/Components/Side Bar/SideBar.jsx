import { useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { House, LogOut, CalendarDays, NotepadText, BedDouble, Settings } from 'lucide-react';
import axios from "axios";
import "./SideBar.css";
import { CgFeed } from "react-icons/cg";
import API_BASE_URL from "../../API/apiConfig";

const SideBar = ({ onLogout }) => {

    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (path) => location.pathname === path;

    const toggleSidebar = () => {
        setIsExpanded(!isExpanded);
    };

    const logout = async () => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(
                `${API_BASE_URL}logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("Logout failed:", error);
        } finally {
            // Clear local storage and navigate to home, regardless of success or failure
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    };
    

    return (
        <div className="wrapper">
            <aside id="sidebar" className={isExpanded ? "expand" : ""}>
                <div className="d-flex align-items-center mt-1">
                    <button className="toggle-btn" onClick={toggleSidebar} type="button">
                        <House />
                    </button>
                    <div className="sidebar-logo">
                        <Link to="/dashboard">Hotel Name</Link>
                    </div>
                </div>
                <ul className="sidebar-nav">

                    <li className="sidebar-item mb-2">
                        <Link
                            to="/booking"
                            className={`sidebar-link ${isActive("/booking") ? "active" : ""}`}
                        >
                            <CalendarDays />
                            <span>Bookings</span>
                        </Link>
                    </li>

                    <li className="sidebar-item mb-2">
                        <Link
                            to="/package"
                            className={`sidebar-link ${isActive("/package") ? "active" : ""}`}
                        >
                            <NotepadText />
                            <span>Packages</span>
                        </Link>
                    </li>

                    <li className="sidebar-item mb-2">
                        <Link
                            to="/rooms"
                            className={`sidebar-link ${isActive("/rooms") ? "active" : ""}`}
                        >
                            <BedDouble />
                            <span>Rooms</span>
                        </Link>
                    </li>

                    <li className="sidebar-item mb-2">
                        <Link
                            to="/feed"
                            className={`sidebar-link ${isActive("/feed") ? "active" : ""}`}
                        >
                            <CgFeed />
                            <span>Feed</span>
                        </Link>
                    </li>

                    <li className="sidebar-item mb-2">
                        <Link
                            to="/settings"
                            className={`sidebar-link ${isActive("/settings") ? "active" : ""}`}
                        >
                            <Settings />
                            <span>Settings</span>
                        </Link>
                    </li>

                </ul>

                <div className="sidebar-footer mb-3">
                    <Link to="#" className="sidebar-link" onClick={logout}>
                        <LogOut />
                        <span>Logout</span>
                    </Link>
                </div>

            </aside>
        </div>
    );
};

export default SideBar;

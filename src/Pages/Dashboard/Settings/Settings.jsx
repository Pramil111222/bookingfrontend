import { useEffect, useState } from "react";
import SideBar from "../../../Components/Side Bar/SideBar";
import HotelDetailsChange from "./tabs/HotelDetailsChange";
import PasswordChange from "./tabs/PasswordChange";
import { House, KeyRound, UserRound } from "lucide-react";
import PersonalDetailsChange from "./tabs/PersonalDetailsChange";
import "./Settings.css"; // Import the CSS file
import axios from 'axios'; // Ensure axios is installed
import API_BASE_URL from "../../../API/apiConfig";

function Settings() {
    const [activeSection, setActiveSection] = useState("account");
    const [user, setUser] = useState({
        name: '',
    });

    useEffect(() => {
        // Fetch the logged-in user's data
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_BASE_URL}user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const { user } = response.data;
                    setUser({
                        name: user.name || 'User', // Assuming the field is 'name'
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    setUser({
                        name: 'User', // Default to 'User' if there's an error
                    });
                });
        }
    }, []);

    const renderActiveSection = () => {
        switch (activeSection) {
            case "personal":
                return <PersonalDetailsChange />;
            case "passwordChange":
                return <PasswordChange />;
            case "hotel":
                return <HotelDetailsChange />;
            default:
                return <PersonalDetailsChange />;
        }
    };

    return (
        <div className="settings-container d-flex">
            <SideBar />

            <div className="settings-content">
                <h1 className="settings-header">Hello {user.name}</h1>

                <div className="settings-flex">
                    <div className="settings-sidebar">
                        <h5>Manage account</h5>

                        <ul>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === "personal" ? "active" : ""}
                                    onClick={() => setActiveSection("personal")}
                                >
                                    <UserRound style={{ marginRight: "0.5rem" }} /> Personal details
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === "passwordChange" ? "active" : ""}
                                    onClick={() => setActiveSection("passwordChange")}
                                >
                                    <KeyRound style={{ marginRight: "0.5rem" }} /> Password Change
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className={activeSection === "hotel" ? "active" : ""}
                                    onClick={() => setActiveSection("hotel")}
                                >
                                    <House style={{ marginRight: "0.5rem" }} /> Hotel details
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="settings-main">
                        {renderActiveSection()}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;

import { useEffect, useState } from "react";
import SideBar from "../../../Components/Side Bar/SideBar";
import HotelDetailsChange from "./tabs/HotelDetailsChange";
import PasswordChange from "./tabs/PasswordChange";
import { House, KeyRound, UserRound } from "lucide-react";
import PersonalDetailsChange from "./tabs/PersonalDetailsChange";
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
        <div style={{ display: "flex" }}>

            <SideBar />

            <div style={{ flexGrow: 1, padding: "2rem" }}>
                <div style={{ marginTop: "2rem" }}>

                    <h1 style={{ fontWeight: "bold", marginBottom: "2rem" }}>
                        Hello {user.name}
                    </h1>

                    <div style={{ display: "flex" }}>
                        <div style={{ flex: "0 0 25%" }}>
                            <div style={{ padding: "1rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "0.5rem" }}>

                                <h5 style={{ textAlign: "center", marginTop: "1rem", fontWeight: "bold" }}>Manage account</h5>

                                <ul style={{ listStyleType: "none", marginTop: "1rem", paddingLeft: "0" }}>
                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <a
                                            href="#"
                                            style={{
                                                textDecoration: "none",
                                                color: activeSection === "personal" ? "#007bff" : "#212529",
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: activeSection === "personal" ? "bold" : "normal",
                                            }}
                                            onClick={() => setActiveSection("personal")}
                                        >
                                            <UserRound style={{ marginRight: "0.5rem" }} /> Personal details
                                        </a>
                                    </li>

                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <a
                                            href="#"
                                            style={{
                                                textDecoration: "none",
                                                color: activeSection === "passwordChange" ? "#007bff" : "#212529",
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: activeSection === "passwordChange" ? "bold" : "normal",
                                            }}
                                            onClick={() => setActiveSection("passwordChange")}
                                        >
                                            <KeyRound style={{ marginRight: "0.5rem" }} /> Password Change
                                        </a>
                                    </li>

                                    <li style={{ marginBottom: "0.5rem" }}>
                                        <a
                                            href="#"
                                            style={{
                                                textDecoration: "none",
                                                color: activeSection === "hotel" ? "#007bff" : "#212529",
                                                display: "flex",
                                                alignItems: "center",
                                                fontWeight: activeSection === "hotel" ? "bold" : "normal",
                                            }}
                                            onClick={() => setActiveSection("hotel")}
                                        >
                                            <House style={{ marginRight: "0.5rem" }} /> Hotel details
                                        </a>
                                    </li>

                                </ul>
                            </div>
                        </div>

                        <div style={{ flex: "0 0 75%", paddingLeft: "1rem" }}>
                            <div style={{ padding: "1rem", boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", borderRadius: "0.5rem" }}>
                                {renderActiveSection()}
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Settings;

import { useState, useEffect } from "react";
import axios from "axios"; 
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const API_BASE_URL = "http://localhost:8000/api/"; 
function RoomFormModel({ showModal, closeModal, onSave, roomToEdit }) {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); 
        }
    }, [navigate]);
    const [userData, setUserData] = useState(null);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        roomName: "",  roomType: "",  acOrNonAc: 0,  facilities: [],    userId: "", room_number: ""
        , room_description: "",
    });
    const [facilitiesList, setFacilitiesList] = useState([]); 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_BASE_URL}user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const { user } = response.data;
                    setUserData({   id: user.id,  name: user.name,  email: user.email,   mobile: user.mobile,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    setError("Failed to load user data. Please try again.");
                });
        }
    }, []);
    useEffect(() => {
        if (userData) {
            setFormData((prevData) => ({
                ...prevData,
                userId: userData.id,
            }));
        }
    }, [userData]);
    useEffect(() => {
        axios
            .get(`${API_BASE_URL}facilities`) 
            .then((response) => {
                setFacilitiesList(response.data.map((facility) => ({
                    id: facility.id,
                    name: facility.name,
                })));
            })
            .catch((error) => {
                console.error("Error fetching facilities:", error);
                setError("Failed to load facilities. Please try again.");
            });
    }, []);
    useEffect(() => {
        if (roomToEdit) {
            setFormData({  roomName: roomToEdit.room_name || "",  roomType: roomToEdit.room_type || "",//  acOrNonAc: roomToEdit.ac_non_ac || "", 
                 room_number: roomToEdit.room_number || "",  room_description: roomToEdit.room_description || "", // Ensure AC/Non-AC is treated as an integer
                facilities: roomToEdit.facilities || [],
                userId: roomToEdit.userId || "",
            });
        }
    }, [roomToEdit]);
    const handleFacilityChange = (facilityId) => {
        setFormData((prevData) => {
            const updatedFacilities = prevData.facilities.includes(facilityId)
                ? prevData.facilities.filter((id) => id !== facilityId)
                : [...prevData.facilities, facilityId]; // Add or remove facility ID from the array
            return { ...prevData, facilities: updatedFacilities };
        });
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedFacilities = formData.facilities.map((facilityId) => String(facilityId)); // Convert IDs to strings
        const dataToSend = {
            ...formData,
            facilities: formattedFacilities, 
            acOrNonAc: formData.acOrNonAc, 
        };
        try {
            if (roomToEdit) {
                await axios.put(`${API_BASE_URL}rooms_edit_update/${roomToEdit.id}`, dataToSend);
                Swal.fire({
                    title: "Success!",
                    text: "Room updated successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            } else {
                await axios.post(`${API_BASE_URL}rooms`, dataToSend);
                Swal.fire({
                    title: "Success!",
                    text: "Room added successfully.",
                    icon: "success",
                    confirmButtonText: "OK",
                });
            }
            if (onSave) onSave();
            closeModal();
        } catch (err) {
            console.error("Error saving room:", err);
            setError(err.response?.data?.message || "An error occurred while saving the room.");
            Swal.fire({
                title: "Error",
                text: err.response?.data?.message || "An error occurred. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: name === "acOrNonAc" ? Number(value) : value, 
        }));
    };
    const confirmClose = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Unsaved changes will be lost!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#007bff",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, close it!",
        }).then((result) => {
            if (result.isConfirmed) {
                closeModal();
            }
        });
    };
    if (!showModal) return null;

    if (!userData) {
        return <div>Loading user data...</div>;
    }
    return (
        <div
        style={{
            position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "5%", zIndex: 1000,
            backdropFilter: "blur(8px)",
        }}
    >
        <div
            className="p-3"
            style={{
                background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "100%", maxWidth: "800px", padding: "20px", maxHeight: "80vh", overflowY: "auto",
            }}
        >
                <h4>{roomToEdit ? "Update Room" : "Add New Room"}</h4>
                {error && <div className="text-danger">{error}</div>}
                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="room_number">Room Number</label>
                        <input type="text"  className="form-control" id="room_number"  name="room_number" value={formData.room_number}  onChange={handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="roomName">Room Name</label>
                        <input  type="text" className="form-control"   id="roomName"   name="roomName"  value={formData.roomName}   onChange={handleChange} required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="room_description">Room Description</label>
                        <input  type="text"  className="form-control"   id="room_description"  name="room_description"  value={formData.room_description} onChange={handleChange}  required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="roomType">Room Type</label>
                        <select  className="form-control"  name="roomType"  value={formData.roomType}  onChange={handleChange}
                            required
                        >
                            <option value="">Select Room Type</option>
                            <option value="Single">Single</option>
                            <option value="Double">Double</option>
                            <option value="Suite">Suite</option>
                            <option value="Deluxe">Deluxe</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="acOrNonAc">AC/Non-AC</label>
                        <select  className="form-control" name="acOrNonAc"   value={formData.acOrNonAc}   onChange={handleChange} 
                        >
                            <option value="2">Non-AC</option>
                            <option value="1">AC</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Room Facilities</label>
                        <div className="facilities-cards">
                            {facilitiesList.map((facility) => (
 <div
 key={facility.id}
 className={`facility-card ${
     formData.facilities.includes(facility.id) ? "selected" : ""
 }`}
 onClick={() => handleFacilityChange(facility.id)}
 style={{
     display: "inline-block",
     padding: "5px 10px",
     border: "1px solid #ccc",
     borderRadius: "5px",
     cursor: "pointer",
     backgroundColor: formData.facilities.includes(facility.id)
         ? "#007bff" // Selected state
         : "#f8f9fa", // Unselected state
     color: formData.facilities.includes(facility.id) ? "#fff" : "#000",
     transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
 }}
>
 {facility.name}
</div>


                            ))}
                        </div>
                    </div>
                    <div className="modal-footer gap-2"> <button  type="button"  className="btn"  style={{  backgroundColor: "red", color: "white", padding: "10px 20px", borderRadius: "5px",
                            }}
                            onClick={confirmClose}
                        >
                            Close
                        </button>
                        <button type="submit"  className="btn" style={{   backgroundColor: "yellow",   color: "black",  padding: "10px 20px",  borderRadius: "5px",
                            }}
                        >
                            {roomToEdit ? "Update" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default RoomFormModel;

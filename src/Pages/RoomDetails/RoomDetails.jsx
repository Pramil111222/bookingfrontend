import { useState } from "react";
import "./RoomDetails.css";
import { Link } from "react-router-dom";

const RoomDetailsForm = () => {
    const [rooms, setRooms] = useState([
        {
            name: "",
            images: null,
            facilities: [],
            roomType: "",
            ac: "Non-AC",
        },
    ]);

    const facilitiesList = [
        "Wi-Fi",
        "TV",
        "Room Service",
        "Mini Bar",
        "Balcony",
        "Swimming Pool",
        "In-Room Safe",
        "Bathroom",
        "Free Wi-Fi",
        "TV",
        "Wardrobe or Closet",
        "Telephone ",
        "Mini Refrigerator",
        "Jacuzzi or Hot Tub",
        "Soundproof Walls and Windows",
        "Coffee Maker ",
        "Complimentary Bottled Water",
        "Hair Dryer",
        "Bluetooth Speaker",
        "USB Charging Ports",
        "Fitness Equipment",
        "Mood Lighting",
        "Library Corner",
        "Fireplace",
        "Gaming Consoles ",
    ];

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRooms = [...rooms];
        updatedRooms[index][name] = value;
        setRooms(updatedRooms);
    };

    const handleFacilityChange = (index, facility) => {
        const updatedRooms = [...rooms];
        const facilities = updatedRooms[index].facilities;
        if (facilities.includes(facility)) {
            updatedRooms[index].facilities = facilities.filter((f) => f !== facility);
        } else {
            updatedRooms[index].facilities.push(facility);
        }
        setRooms(updatedRooms);
    };

    const handleFileChange = (index, e) => {
        const updatedRooms = [...rooms];
        updatedRooms[index].images = e.target.files;
        setRooms(updatedRooms);
    };

    const addRoom = () => {
        setRooms([
            ...rooms,
            { name: "", images: null, facilities: [], roomType: "", ac: "Non-AC" },
        ]);
    };

    const removeRoom = (index) => {
        const updatedRooms = rooms.filter((_, i) => i !== index);
        setRooms(updatedRooms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(rooms);
        // Handle room data submission logic here
    };

    return (
        <div className="form-container">
            <h2>Room Details</h2>
            <form onSubmit={handleSubmit}>
                {rooms.map((room, index) => (

                    <div key={index} className="room-section">
                        <h3>Room {index + 1}</h3>
                        <div className="hotel-details-form">
                            <div className="group-1">

                                <div className="form-group">
                                    <label>Room Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={room.name}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="form-control"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Room Images</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="images"
                                        onChange={(e) => handleFileChange(index, e)}
                                        multiple
                                        accept="image/*"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Room Facilities</label>
                                    <div className="facilities-cards">
                                        {facilitiesList.map((facility) => (
                                            <div
                                                key={facility}
                                                className={`facility-card ${room.facilities.includes(facility) ? "selected" : ""
                                                    }`}
                                                onClick={() => handleFacilityChange(index, facility)}
                                            >
                                                {facility}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="group-1">
                                <div className="form-group">
                                    <label>Room Type</label>
                                    <select
                                        name="roomType"
                                        value={room.roomType}
                                        onChange={(e) => handleInputChange(index, e)}
                                        required
                                        className="form-control"
                                    >
                                        <option value="">Select Room Type</option>
                                        <option value="Single">Single</option>
                                        <option value="Double">Double</option>
                                        <option value="Suite">Suite</option>
                                        <option value="Deluxe">Deluxe</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label>AC/Non-AC</label>
                                    <select
                                        name="ac"
                                        value={room.ac}
                                        className="form-control"
                                        onChange={(e) => handleInputChange(index, e)}
                                    >
                                        <option value="AC">AC</option>
                                        <option value="Non-AC">Non-AC</option>
                                    </select>
                                </div>
                                {rooms.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-room-button"
                                        onClick={() => removeRoom(index)}
                                    >
                                        Remove Room
                                    </button>
                                )}
                                <button type="button" className="add-room-button mb-2" onClick={addRoom}>
                                    Add Room
                                </button>
                                <div className="form-group-buttons">
                                    <button type="reset" className="next-button btn btn-danger text-white">Clear</button>
                                    <button type="submit" className="next-button btn btn-primary text-white"> <Link to='/hotelFacilities'>Next </Link></button> 
                                </div>
                            </div>
                        </div>
                    </div>

                ))}

            </form>
        </div>
    );
};

export default RoomDetailsForm;

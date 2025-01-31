import { useState } from "react";
import { Link } from "react-router-dom";

function Facilities() {
    const [hotels, setHotels] = useState([
        { id: 1, name: "Hotel 1", facilities: [] },
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
        "Wardrobe or Closet",
        "Telephone",
        "Mini Refrigerator",
        "Jacuzzi or Hot Tub",
        "Soundproof Walls and Windows",
        "Coffee Maker",
        "Complimentary Bottled Water",
        "Bluetooth Speaker",
        "USB Charging Ports",
        "Fitness Equipment",
        "Mood Lighting",
        "Library Corner",
        "Fireplace",
        "Gaming Consoles",
        "Gym",
        "Play Ground",
        "Spa and Wellness Center",
        "Conference Room",
        "Banquet Hall",
        "Laundry Service",
        "Airport Shuttle",
        "Free Parking",
        "Business Center",
        "Pet-Friendly Facilities",
        "Childcare Services",
        "24/7 Front Desk",
        "Concierge Service",
        "Restaurant",
        "Bar",
        "Terrace",
        "Outdoor Sports Facilities",
        "Sauna",
        "Steam Room",
        "Private Beach Access",
        "Elevator",
        "Wheelchair Accessibility",
        "Hairdryer",
        "Luggage Storage",
        "Tour Desk",
        "Wake-Up Service",
        "Gift Shop",
        "Bicycle Rentals",
        "Car Rentals",
        "Outdoor Pool",
        "Indoor Pool",
    ];

    const handleFacilityChange = (hotelIndex, facility) => {
        const updatedHotels = [...hotels];
        const facilities = updatedHotels[hotelIndex].facilities;

        if (facilities.includes(facility)) {
            updatedHotels[hotelIndex].facilities = facilities.filter((f) => f !== facility);
        } else {
            updatedHotels[hotelIndex].facilities.push(facility);
        }

        setHotels(updatedHotels);
    };

    const handleTextFieldChange = (hotelIndex, e) => {
        const updatedHotels = [...hotels];
        updatedHotels[hotelIndex].facilities = e.target.value.split(",").map((f) => f.trim());
        setHotels(updatedHotels);
    };

    const handleTextFieldKeyPress = (hotelIndex, e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newFacility = e.target.value.trim();
            if (newFacility) {
                handleFacilityChange(hotelIndex, newFacility);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hotels Data:", hotels);
    };

    return (
        <div className="form-container">
            <h2>Hotel Facilities</h2>
            <form onSubmit={handleSubmit}>
                {hotels.map((hotel, index) => (
                    <div key={hotel.id} className="hotel-section">
                        <h3>{hotel.name}</h3>
                        <div className="form-group">
                            <label>Facilities</label>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hotel.facilities.join(", ")}
                                    onChange={(e) => handleTextFieldChange(index, e)}
                                    onKeyPress={(e) => handleTextFieldKeyPress(index, e)}
                                    placeholder="Type and press Enter to add a facility"
                                />
                                <button type="submit" className="btn btn-secondary">
                                   <Link to="/activity"> Submit</Link>
                                </button>
                            </div>

                            <div className="facilities-cards">
                                {facilitiesList.map((facility) => (
                                    <div
                                        key={facility}
                                        className={`facility-card ${hotel.facilities.includes(facility) ? "selected" : ""
                                            }`}
                                        onClick={() => handleFacilityChange(index, facility)}
                                    >
                                        {facility}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                ))}

            </form>
        </div>
    );
}

export default Facilities;

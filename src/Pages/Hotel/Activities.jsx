import { useState } from "react";

function Activities() {
    const [activity, setActivity] = useState([
        { id: 1, name: "Hotel 1", indoorActivities: [], outdoorActivities: [] },
    ]);

    const indoorActivityList = [
        "Board Games",
        "Movie Nights",
        "Cooking Classes",
        "Wine or Cocktail Tasting",
        "Art and Craft Workshops",
        "Karaoke",
        "Yoga and Meditation Sessions",
        "Dance Classes",
        "Gaming Consoles",
        "Virtual Reality Experiences",
        "Live Music or Performances",
        "Storytelling Sessions",
        "Trivia Nights",
        "Fitness or Aerobics Classes",
        "Indoor Sports",
        "Escape Room Challenges",
        "Chess or Checkers Competitions",
        "Mindfulness Workshops",
        "Workshops for Kids",
        "Photography Classes",
        "Language Classes",
    ];

    const outdoorActivityList = [
        "Hiking Trails",
        "Outdoor Sports",
        "Barbecue Nights",
        "Bonfire Nights",
        "Nature Walks",
        "Picnics",
        "Gardening Activities",
        "Yoga in the Garden",
        "Bird Watching",
        "Swimming",
        "Outdoor Movie Screenings",
        "Camping",
        "Cycling",
        "Water Sports",
        "Rock Climbing",
        "Fishing",
        "Team-Building Activities",
        "Obstacle Courses",
        "Stargazing",
        "Horse Riding",
    ];

    const handleActivityChange = (hotelIndex, activityItem, type) => {
        const updatedActivity = [...activity];
        const activities = updatedActivity[hotelIndex][type];

        if (activities.includes(activityItem)) {
            updatedActivity[hotelIndex][type] = activities.filter((act) => act !== activityItem);
        } else {
            updatedActivity[hotelIndex][type].push(activityItem);
        }

        setActivity(updatedActivity);
    };

    const handleTextFieldChange = (hotelIndex, e, type) => {
        const updatedActivity = [...activity];
        updatedActivity[hotelIndex][type] = e.target.value.split(",").map((act) => act.trim());
        setActivity(updatedActivity);
    };

    const handleTextFieldKeyPress = (hotelIndex, e, type) => {
        if (e.key === "Enter") {
            e.preventDefault();
            const newActivity = e.target.value.trim();
            if (newActivity) {
                handleActivityChange(hotelIndex, newActivity, type);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Hotels Data:", activity);
    };

    return (
        <div className="form-container">
            <h2>Hotel Activities</h2>
            <form onSubmit={handleSubmit}>
                {activity.map((hotel, index) => (
                    <div key={hotel.id} className="hotel-section">
                        <h3>{hotel.name}</h3>
                        <div className="form-group">
                            <label>Indoor Activities</label>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hotel.indoorActivities.join(", ")}
                                    onChange={(e) => handleTextFieldChange(index, e, "indoorActivities")}
                                    onKeyPress={(e) => handleTextFieldKeyPress(index, e, "indoorActivities")}
                                    placeholder="Type and press Enter to add an indoor activity"
                                />
                            </div>
                            <div className="facilities-cards">
                                {indoorActivityList.map((activityItem) => (
                                    <div
                                        key={activityItem}
                                        className={`facility-card ${hotel.indoorActivities.includes(activityItem) ? "selected" : ""
                                            }`}
                                        onClick={() => handleActivityChange(index, activityItem, "indoorActivities")}
                                    >
                                        {activityItem}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Outdoor Activities</label>
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    value={hotel.outdoorActivities.join(", ")}
                                    onChange={(e) => handleTextFieldChange(index, e, "outdoorActivities")}
                                    onKeyPress={(e) => handleTextFieldKeyPress(index, e, "outdoorActivities")}
                                    placeholder="Type and press Enter to add an outdoor activity"
                                />
                            </div>
                            <div className="facilities-cards">
                                {outdoorActivityList.map((activityItem) => (
                                    <div
                                        key={activityItem}
                                        className={`facility-card ${hotel.outdoorActivities.includes(activityItem) ? "selected" : ""
                                            }`}
                                        onClick={() => handleActivityChange(index, activityItem, "outdoorActivities")}
                                    >
                                        {activityItem}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
                <div className="modal-footer">
                    <button type="submit" className="btn btn-secondary" style={{ width: "200px", height: '40px' }}>
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}

export default Activities;

import { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import SideBar from "../../Components/Side Bar/SideBar";
import BookingFromModal from "../Form Models/BookingFromModal";
import DateEventModal from "../Form Models/DateEventModal";
import "./Bookings.css";
import API_BASE_URL from "../../API/apiConfig";


function Bookings() {
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDateModal, setShowDateModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [dateEvents, setDateEvents] = useState([]);

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    const [events, setEvents] = useState([
        { id: "1", title: "Meeting", start: "2025-01-25T10:00:00", end: "2025-01-25T12:00:00", color: getRandomColor() },
        { id: "2", title: "Conference", start: "2025-01-12T09:00:00", color: getRandomColor() },
    ]);

    useEffect(() => {
        fetchBookings();
    });

    const fetchBookings = async () => {
        const response = await fetch(`${API_BASE_URL}bookings_data`);
        const data = await response.json();
        setEvents(data);
    };

    const handleDateClick = async (info) => {
        const clickedDate = info.dateStr;
    
        try {
            const response = await fetch(`${API_BASE_URL}bookings_data?date=${clickedDate}`);
            const data = await response.json();
    
            if (response.ok) {
                setSelectedDate(clickedDate);
                setDateEvents(data);  // Set the fetched bookings data
                setShowDateModal(true); // Show the modal
            } else {
                console.error('Failed to fetch bookings:', data);
                setDateEvents([]); // Clear any existing events if the request fails
            }
        } catch (error) {
            console.error('Error fetching bookings:', error);
            setDateEvents([]); // Clear any existing events if the request fails
        }
    };
    
    
    

    // const handleEventClick = (info) => {
    //     alert(`Event: ${info.event.title}`);
    // };

    const handleEventDrop = (info) => {
        console.log(`Event dropped on ${info.event.start}`);
    };

    const handleEventResize = (info) => {
        console.log(`Event resized to ${info.event.end}`);
    };

    const handleAddNewBooking = () => {
        setShowEditModal(true);
    };

    const handleCloseEditModal = () => {
        setShowEditModal(false);
    };

    const handleCloseDateModal = () => {
        setShowDateModal(false);
    };

    return (
        <div className="d-flex">
            <SideBar />

            <div className="flex-grow-1 p-4 calendar-container">

                <div className="row mb-2">
                    <div className="col-md-6">
                        <h4>Booking</h4>
                    </div>
                    <div className="col-md-6 d-flex justify-content-end">
                        <button className="btn btn-primary" onClick={handleAddNewBooking}>
                            Add New Booking
                        </button>
                    </div>
                </div>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={events}
                    editable={true}
                    selectable={true}
                    dateClick={handleDateClick}
                    // eventClick={handleEventClick}
                    eventDrop={handleEventDrop}
                    eventResize={handleEventResize}
                    height={"85vh"}
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                    }}
                />
                <BookingFromModal
                    showModal={showEditModal}
                    closeModal={handleCloseEditModal}
                    onSave={fetchBookings}
                />
                <DateEventModal
                    show={showDateModal}
                    selectedDate={selectedDate}
                    events={dateEvents}
                    onClose={handleCloseDateModal}
                />
            </div>
        </div>
    );
}

export default Bookings;

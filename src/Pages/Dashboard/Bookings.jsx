import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import SideBar from '../../Components/Side Bar/SideBar';

function Bookings() {
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

    const handleDateClick = (info) => {
        alert(`Date clicked: ${info.dateStr}`);
    };

    const handleEventClick = (info) => {
        alert(`Event: ${info.event.title}`);
    };

    const handleEventDrop = (info) => {
        console.log(`Event dropped on ${info.event.start}`);
    };

    const handleEventResize = (info) => {
        console.log(`Event resized to ${info.event.end}`);
    };


    return (
        <div className='d-flex'>
            <SideBar />
            <div className="flex-grow-1 p-5">
                <div className="d-flex justify-content-center align-items-center">
                    <div style={{ width: '175vh', height: '85vh', overflow: 'auto' }}>
                        <FullCalendar
                            plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            weekends={true}
                            events={events}
                            editable={true}
                            selectable={true}
                            dateClick={handleDateClick}
                            eventClick={handleEventClick}
                            eventDrop={handleEventDrop}
                            eventResize={handleEventResize}
                            height="85vh"
                            headerToolbar={{
                                left: "prev,next today",
                                center: "title",
                                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bookings;

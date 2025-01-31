function DateEventModal({ show, selectedDate, events, onClose }) {
    if (!show) return null;

    return (
        <div className="modal show" style={{ display: "block", background: "rgba(0, 0, 0, 0.5)" }}>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Bookings on {selectedDate}</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        {events.length > 0 ? (
                            <ul>
                                {events.map((booking) => (
                                    <li key={booking.id}>
                                        {booking.cus_name} (Check-in: {booking.check_in} - Check-out: {booking.check_out})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No bookings on this date.</p>
                        )}
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={onClose}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DateEventModal;

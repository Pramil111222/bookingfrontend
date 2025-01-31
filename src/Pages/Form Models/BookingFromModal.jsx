import { useState } from "react";
import Swal from "sweetalert2"; // Import SweetAlert
import API_BASE_URL from '../../API/apiConfig';

function BookingFromModal({ showModal, closeModal, onSave, booking }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        cusName: "",
        cusNic: "",
        cusEmail: "",
        cusTp: "",
        checkIn: "",
        checkOut: "",
        room: "",
        pkgType: "",
        note: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Convert dates to JavaScript Date objects
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
    
        // Check if checkOut is after checkIn
        if (checkOutDate <= checkInDate) {
            Swal.fire({
                icon: "error",
                title: "Invalid Dates",
                text: "Check-out date must be after check-in date!",
            });
            return;
        }
    
        try {
            const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
            const response = await fetch(`${API_BASE_URL}bookings`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`, // Include the JWT token in the headers
                },
                body: JSON.stringify({
                    cus_name: formData.cusName,
                    cus_nic: formData.cusNic,
                    cus_email: formData.cusEmail,
                    cus_tp: formData.cusTp,
                    check_in: formData.checkIn,
                    check_out: formData.checkOut,
                    room: formData.room,
                    room_name: formData.room, // Assuming room_name is the same as room
                    pkg_type: formData.pkgType,
                    note: formData.note,
                }),
            });
    
            const data = await response.json();
            if (response.ok) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Booking saved successfully!",
                });
    
                onSave(); // Call the function to refresh data
                closeModal(); // Close the modal
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: data.message || "Something went wrong!",
                });
            }
        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Error!",
                text: err.message || "Something went wrong!",
            });
        }
    };
    

    if (!showModal) return null;

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px", zIndex: 1000, backdropFilter: "blur(8px)", overflowY: "auto", }} >
            <div style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "100%", maxWidth: "800px", padding: "20px", boxSizing: "border-box", maxHeight: "90vh", overflowY: "auto", }}>

                <h4>{booking ? 'Update Room' : 'Add New Room'}</h4>

                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className='mt-2'>

                    <div className='row'>
                        <div className="col-md-6 form-group">
                            <label htmlFor="cusName">Customer Name <span>*</span></label>
                            <input type="text" className="form-control" id="cusName" name='cusName' value={formData.cusName} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label htmlFor="cusNic">Customer NIC <span>*</span> </label>
                            <input type="text" className="form-control" id="cusNic" name='cusNic' value={formData.cusNic} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-6 form-group">
                            <label htmlFor="cusEmail">Customer Email <span> (optional)</span></label>
                            <input type="text" className="form-control" id="cusEmail" name='cusEmail' value={formData.cusEmail} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label htmlFor="cusTp">Customer Mobile Number <span>*</span> </label>
                            <input type="text" className="form-control" id="cusTp" name='cusTp' value={formData.cusTp} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-6 form-group">
                            <label htmlFor="checkIn">Check In Date <span>*</span></label>
                            <input type="datetime-local" className="form-control" id="checkIn" name='checkIn' value={formData.checkIn} onChange={handleChange} />
                        </div>

                        <div className="col-md-6 form-group">
                            <label htmlFor="checkOut"> Check Out Date <span>*</span> </label>
                            <input type="datetime-local" className="form-control" id="checkOut" name='checkOut' value={formData.checkOut} onChange={handleChange} />
                        </div>
                    </div>

                    <div className='row'>
                        <div className="col-md-6 form-group">
                            <label htmlFor="room">Room <span>*</span></label>
                            <select className="form-control" name="room" value={formData.room} onChange={handleChange} required>
                                <option value="">Select Room Type</option>
                                <option value="Single">Single</option>
                                <option value="Double">Double</option>
                                <option value="Suite">Suite</option>
                                <option value="Deluxe">Deluxe</option>
                            </select>
                        </div>
                        <div className="col-md-6 form-group">
                            <label htmlFor="pkgType">Package</label>
                            <select className="form-control" name="pkgType" id="pkgType" value={formData.pkgType} onChange={handleChange} required >
                                <option value="">Select Package Type</option>
                                <option value="bed">Bed Only</option>
                                <option value="bedAndBreakfast">Bed And Breakfast</option>
                            </select>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-6 form-group">
                            <label htmlFor="note">Description/Notes</label>
                            <textarea className="form-control" name="note" id="note" value={formData.note} onChange={handleChange} />
                        </div>


                    </div>

                    <div className="modal-footer" style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: "red", color: "white", padding: "10px 20px", borderRadius: "5px", }} onClick={closeModal} >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "yellow", color: "black", padding: "10px 20px", borderRadius: "5px", }}  >
                            {booking ? "Update" : "Save Changes"}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    )
}

export default BookingFromModal
import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from '../../API/apiConfig';
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function PackageFormModel({ showModal, closeModal, onSave, selectedPackage }) {
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
        id: '',
        packageName: '',
        packageType: '',
        price: '',
        duration: '',
        numberOfGuests: '',
        availabilityStatus: 'Available', // Default to "Available"
        discount: '',
        userId: '',
    });

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_BASE_URL}user`, {
                    headers: { Authorization: `Bearer ${token}` },
                })
                .then((response) => {
                    const { user } = response.data;
                    setUserData({
                        id: user.id,
                        name: user.name,
                        email: user.email,
                        mobile: user.mobile,
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
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
        if (selectedPackage) {
            setFormData({
                id: selectedPackage.id || '',
                packageName: selectedPackage.package_name || '',
                packageType: selectedPackage.package_type || '',
                price: selectedPackage.price || '',
                duration: selectedPackage.duration || '',
                numberOfGuests: selectedPackage.number_of_guests || '',
                availabilityStatus: selectedPackage.availability_status || 'Available',
                discount: selectedPackage.discount || '',
                userId: selectedPackage.userId || userData?.id || '',
            });
        }
    }, [selectedPackage, userData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Define the URL for both POST (create) and PUT (update) requests
            const url = selectedPackage
                ? `${API_BASE_URL}packages/${formData.id}`
                : `${API_BASE_URL}packages`;
            const method = selectedPackage ? 'PUT' : 'POST';
    
            // Include userId in the payload to send it to the backend
            const payload = {
                package_name: formData.packageName,
                package_type: formData.packageType,
                price: formData.price,
                duration: formData.duration,
                number_of_guests: formData.numberOfGuests,
                availability_status: formData.availabilityStatus,
                discount: formData.discount,
                user_id: formData.userId,  // Ensure userId is included in the payload
            };
    
            // Make the API request
            await axios({
                method,
                url,
                data: payload,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
    
            // Show success alert
            await Swal.fire({
                icon: 'success',
                title: selectedPackage ? 'Package Updated' : 'Package Added',
                text: `The package has been successfully ${selectedPackage ? 'updated' : 'added'}!`,
                confirmButtonText: 'OK',
            });
    
            // Refresh the page or update state as needed
            window.location.reload();
        } catch (err) {
            setError(`Error ${selectedPackage ? 'updating' : 'adding'} package: ${err.message}`);
        }
    };
    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    if (!showModal) return null;

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                paddingTop: "5%",
                zIndex: 1000,
                backdropFilter: "blur(8px)",
            }}
        >
            <div
                className="p-3"
                style={{
                    background: "#ffffff",
                    borderRadius: "10px",
                    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    width: "100%",
                    maxWidth: "400px",
                    padding: "20px",
                    overflowY: "auto", // Makes the modal scrollable if the content overflows
                    maxHeight: "80vh", // Limit the height of the modal
                }}
            >
                <h4>{selectedPackage ? 'Update Package' : 'Add New Package'}</h4>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit} className="mt-2">
                    <div className="form-group">
                        <label htmlFor="packageName">Package Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="packageName"
                            name="packageName"
                            value={formData.packageName}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="packageType">Package Type</label>
                        <input
                            type="text"
                            className="form-control"
                            id="packageType"
                            name="packageType"
                            value={formData.packageType}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            className="form-control"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="duration">Duration (Days)</label>
                        <input
                            type="text"
                            className="form-control"
                            id="duration"
                            name="duration"
                            value={formData.duration}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="numberOfGuests">Number of Guests</label>
                        <input
                            type="number"
                            className="form-control"
                            id="numberOfGuests"
                            name="numberOfGuests"
                            value={formData.numberOfGuests}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="availabilityStatus">Availability Status</label>
                        <select
                            className="form-select"
                            id="availabilityStatus"
                            name="availabilityStatus"
                            value={formData.availabilityStatus}
                            onChange={handleChange}
                        >
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="discount">Discount (%)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="discount"
                            name="discount"
                            value={formData.discount}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="modal-footer gap-2">
                        <button
                            type="button"
                            className="btn"
                            style={{ backgroundColor: "red", color: "white" }}
                            onClick={closeModal}
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="btn"
                            style={{ backgroundColor: "yellow", color: "black" }}
                        >
                            {selectedPackage ? 'Update' : 'Save Changes'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PackageFormModel;

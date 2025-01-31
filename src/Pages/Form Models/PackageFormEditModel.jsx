import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function PackageFormEditModel({ showModal, closeModal, onSave, selectedPackage }) {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        id: '',
        packageName: '',
        packageType: '',
        price: '',
    });

    useEffect(() => {
        if (selectedPackage) {
            setFormData({
                id: selectedPackage.id || '',
                packageName: selectedPackage.package_name || '',
                packageType: selectedPackage.package_type || '',
                price: selectedPackage.price || '',
            });
        }
    }, [selectedPackage]);
    


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const url = `http://127.0.0.1:8000/api/packages_edit/${formData.id}`;
            const method = 'PUT';

            const response = await axios({
                method,
                url,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            Swal.fire({
                icon: 'success',
                title: 'Package Updated',
                text: 'The package has been successfully updated!',
                confirmButtonText: 'OK',
            });

            onSave(); // Refresh table data
            closeModal(); // Close modal after saving
        } catch (err) {
            setError(`Error updating package: ${err.message}`);
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
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "5%", zIndex: 1000, backdropFilter: "blur(8px)" }}>
            <div className="p-3" style={{ background: "#ffffff", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", width: "100%", maxWidth: "400px", padding: "20px" }}>
                <h4>Update Package</h4>
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
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PackageFormEditModel;

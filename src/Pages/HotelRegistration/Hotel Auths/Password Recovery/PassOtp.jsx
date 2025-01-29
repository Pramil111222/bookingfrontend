import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";

function PassOtp() {
    const [formData, setFormData] = useState({
        email: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8000/api/send-otp", formData);
            setMessage(response.data.message);

            // Check if OTP was sent successfully
            if (response.data.message === "OTP sent successfully") {
                setTimeout(() => {
                    // Pass the email as state while navigating to /reqOtp
                    navigate("/reqOtp", { state: { email: formData.email } });
                }, 1000); // Delay for 1 second to show the message
            }
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong. Please try again."
            );
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Confirm OTP</h1>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="text"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">Submit</button>
                    {message && <p className="text-center text-success mt-3">{message}</p>}
                </form>
            </div>
        </div>
    );
}

export default PassOtp;

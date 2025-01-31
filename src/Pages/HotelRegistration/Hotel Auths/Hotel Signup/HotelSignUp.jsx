import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from "../../../../API/apiConfig";

function HotelSignUp() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        // Transform the field names to match the backend expectations
        const backendFormData = {
            first_name: formData.firstName,
            last_name: formData.lastName,
            email: formData.email,
            password: formData.password,
            confirm_password: formData.confirmPassword,
        };

        try {
            const response = await axios.post(`${API_BASE_URL}register`, backendFormData);
            setSuccess("Registration successful. Please login...!");
            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || "Registration failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 p-3">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", width: "100%", borderRadius: "15px" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4" style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)" }}>Sign Up</h1>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                    
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First name" required />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last name" required />
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter your email" required />
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input type={passwordVisible ? "text" : "password"} className="form-control" name="password" value={formData.password} onChange={handleInputChange} placeholder="Enter your password" required />
                            <button type="button" className="btn btn-outline-secondary" onClick={togglePasswordVisibility}>
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input type={confirmPasswordVisible ? "text" : "password"} className="form-control" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm your password" required />
                            <button type="button" className="btn btn-outline-secondary" onClick={toggleConfirmPasswordVisibility}>
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" required />
                        <label className="form-label">
                            I agree to the <a href="/policy" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-primary'>privacy policy</a>
                        </label>
                    </div>
                    
                    <div className="form-check mb-3">
                        <input className="form-check-input" type="checkbox" required />
                        <label className="form-label">
                            I agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-primary'>terms & conditions</a>
                        </label>
                    </div>
                    
                    <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
                    
                    <div className="text-center mb-3">
                        <div className="d-flex align-items-center">
                            <hr className="flex-grow-1" />
                            <span className="mx-2">OR</span>
                            <hr className="flex-grow-1" />
                        </div>
                    </div>
                    
                    <button type="button" className="btn btn-light btn-lg w-100 mb-3 d-flex align-items-center justify-content-center" style={{ border: "1px solid #dee2e6", padding: "0.75rem", fontSize: "1rem" }}>
                        <FcGoogle className="me-2" /> Sign In With Google
                    </button>
                    
                    <p className="text-center" style={{ fontSize: "0.95rem" }}>
                        Already have an account? <Link to="/" className="text-primary text-decoration-none">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default HotelSignUp;
import { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure you have axios installed (npm install axios)
import Swal from 'sweetalert2'; // Import SweetAlert2
import API_BASE_URL from '../../../../API/apiConfig'; // Import the base URL

function HotelSignUp() {
    const navigate = useNavigate(); // Initialize useNavigate hook for redirection
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isPrivacyChecked, setIsPrivacyChecked] = useState(false);
    const [isTermsChecked, setIsTermsChecked] = useState(false);

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

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Passwords do not match',
                text: 'Please ensure the passwords are the same.',
            });
            return;
        }

        if (!isPrivacyChecked || !isTermsChecked) {
            Swal.fire({
                icon: 'error',
                title: 'Please agree to the privacy policy and terms & conditions',
                text: 'You must agree to both the privacy policy and terms & conditions to proceed.',
            });
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}register`, {
                first_name: formData.firstName,
                last_name: formData.lastName,
                email: formData.email,
                password: formData.password,
            });
            console.log(response.data);

            // Show success message using SweetAlert2
            Swal.fire({
                title: 'Registration successful!',
                text: 'Click OK to log in.',
                icon: 'success',
                confirmButtonText: 'OK',
            });

            // Redirect to /dashboard after successful registration
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: 'Please try again later.',
            });
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <h1 className="text-center mb-4">Sign Up</h1>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="firstName"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="First name"
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="lastName"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Last name"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={togglePasswordVisibility}
                            >
                                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="input-group">
                            <input
                                type={confirmPasswordVisible ? "text" : "password"}
                                className="form-control"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                className="btn btn-outline-secondary"
                                onClick={toggleConfirmPasswordVisibility}
                            >
                                {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isPrivacyChecked}
                            onChange={(e) => setIsPrivacyChecked(e.target.checked)}
                        />
                        <label className="form-label">
                            I agree to the <a href="/policy" target="_blank" rel="noopener noreferrer" className='text-decoration-none text-primary'>privacy policy</a>
                        </label>
                    </div>

                    <div className="form-check mb-3">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            checked={isTermsChecked}
                            onChange={(e) => setIsTermsChecked(e.target.checked)}
                        />
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

                    <button type="button" className="btn btn-light w-100 mb-3">
                        <FcGoogle className="me-2" /> Sign In With Google
                    </button>

                    <p className="text-center">
                        Already have an account? <Link to="/" className="text-primary text-decoration-none">Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default HotelSignUp;

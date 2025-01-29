import { useState, useEffect } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import API_BASE_URL from '../../../../API/apiConfig';

function HotelLogin() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [loginUrl, setLoginUrl] = useState(null);
    const navigate = useNavigate();

    // Fetch the Google login URL on component mount
    useEffect(() => {
        fetch('http://localhost:8000/api/auth', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch Google login URL');
            })
            .then((data) => setLoginUrl(data.url))
            .catch((error) => console.error('Error:', error));
    }, []);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}login`, {
                email: formData.email,
                password: formData.password,
            });

            if (response.data.token && response.data.user) {
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", JSON.stringify(response.data.user));

                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful',
                    text: `Welcome, ${response.data.user.name}!`,
                    showConfirmButton: false,
                    timer: 1500,
                });

                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } else {
                setError("Invalid login response. Please try again.");
            }
        } catch (err) {
            setError(err.response?.data?.error || "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
                <form onSubmit={handleLogin}>
                    <h1 className="text-center mb-4">Login</h1>

                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={passwordVisible ? "text" : "password"}
                                className="form-control"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter your password"
                                required
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
                        <Link to="/passOtp" className="text-primary text-decoration-none">Forgotten Password?</Link>
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? "Logging in..." : "Log In"}
                    </button>

                    {error && <div className="alert alert-danger mt-3">{error}</div>}

                    <div className="text-center mb-3">
                        <div className="d-flex align-items-center">
                            <hr className="flex-grow-1" />
                            <span className="mx-2">OR</span>
                            <hr className="flex-grow-1" />
                        </div>
                    </div>

                    {loginUrl ? (
                        <a href={loginUrl} className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
                            <FcGoogle className="me-2" /> Sign in with Google
                        </a>
                    ) : (
                        <p>Loading Google login URL...</p>
                    )}

                    <p className="text-center">
                        Don’t have an account yet? <Link to="/signUp" className="text-primary text-decoration-none">Sign Up</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default HotelLogin;

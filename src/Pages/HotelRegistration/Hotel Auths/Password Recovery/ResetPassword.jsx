import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";


function ResetPassword() {
    const location = useLocation();
    const email = location.state?.email || ""; 
    const navigate = useNavigate(); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("");
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });
    const [isSuccess, setIsSuccess] = useState(false);

    
    useEffect(() => {
        if (!email) {
            navigate("/"); 
        }
    }, [email, navigate]);

    const togglePasswordVisibility = () => {
        setPasswordVisible((prev) => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible((prev) => !prev);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    const passwordValidity = {
        length: password.length >= 8,
        capital: /[A-Z]/.test(password),
        simple: /[a-z]/.test(password),
        number: /[0-9]/.test(password),
    };

    const passwordsMatch = password && confirmPassword && password === confirmPassword;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwordsMatch || !Object.values(passwordValidity).every(Boolean)) {
            setAlertMessage("Please make sure your password meets all requirements and matches.");
            setAlertType("text-danger");
            return;
        }

        try {
           
            const response = await axios.post("http://localhost:8000/api/reset-password", {
                email: email,
                password: password,
                password_confirmation: confirmPassword, 
            });

            if (response.data.status === 200) {
                setAlertMessage(response.data.message);
                setAlertType("text-success");
                setIsSuccess(true); 

                
                setTimeout(() => {
                    navigate("/"); 
                }, 3000);
            } else {
                setAlertMessage(response.data.message);
                setAlertType("text-danger");
            }
        } catch (error) {
            setAlertMessage("Something went wrong. Please try again.");
            setAlertType("text-danger");
        }
    };
    useEffect(() => {
        if (alertMessage || isSuccess) {
          const timer = setTimeout(() => {
            navigate("/"); // Redirect to home page
          }, 3000); // 3-second delay
    
          return () => clearTimeout(timer); // Cleanup timer
        }
      }, [alertMessage, isSuccess, navigate]);
    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
                <h3 className="text-center">Reset Password</h3>
                <div>
                    {alertMessage && (
                        <div
                        className={`popup-container ${alertType}`}
                        style={{
                            position: "fixed",
                            top: "20%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#fff",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                            zIndex: 1000,
                            textAlign: "center",
                        }}
                        >
                        {alertMessage}
                        </div>
                    )}
                    {isSuccess && (
                        <div
                        className="text-center text-primary font-weight-bold"
                        style={{
                            fontSize: "18px",
                            marginTop: "10px",
                            textAlign: "center",
                            position: "fixed",
                            top: "30%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "#d4edda",
                            padding: "20px",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
                            zIndex: 1000,
                        }}
                        >
                        
                        </div>
                    )}
                    </div>

                <form onSubmit={handleSubmit}>
                    <input type="hidden" name="email" value={email} /> {/* Hidden input for email */}

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

                        <div className="mt-2">
                            <p className={passwordValidity.length ? "text-success" : "text-danger"}>
                                {passwordValidity.length ? <FaCheckCircle /> : <FaTimesCircle />} At least 8 characters
                            </p>
                            <p className={passwordValidity.capital ? "text-success" : "text-danger"}>
                                {passwordValidity.capital ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 capital letter
                            </p>
                            <p className={passwordValidity.simple ? "text-success" : "text-danger"}>
                                {passwordValidity.simple ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 lowercase letter
                            </p>
                            <p className={passwordValidity.number ? "text-success" : "text-danger"}>
                                {passwordValidity.number ? <FaCheckCircle /> : <FaTimesCircle />} At least 1 number
                            </p>
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

                        {!passwordsMatch && confirmPassword && (
                            <small className="text-danger">Passwords do not match</small>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100 mb-3"
                        disabled={!passwordsMatch || !Object.values(passwordValidity).every(Boolean)}
                    >
                        Save Changes
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;

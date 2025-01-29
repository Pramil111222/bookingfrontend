import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function ReqOtp() {
    const location = useLocation();
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(30);
    const [isRunning, setIsRunning] = useState(false);
    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false); // Loading state for submit
    const [resendLoading, setResendLoading] = useState(false); // Loading state for resend OTP
    const email = location.state?.email || "";

    // Redirect to home if no email is provided
    useEffect(() => {
        if (!email) {
            navigate("/");
        }
    }, [email, navigate]);

    // Handle countdown timer
    useEffect(() => {
        let intervalId = null;

        if (isRunning && seconds > 0) {
            intervalId = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
        } else if (seconds === 0) {
            setSeconds(30);
            setIsRunning(false);
        }

        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [isRunning, seconds]);

    // Handle OTP input change
    const handleInputChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,6}$/.test(value)) {
            setOtp(value);
        }
    };

    // Submit OTP for verification
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post("http://localhost:8000/api/verify-otp", {
                otp: otp,
                email: email,
            });

            if (response.data.status === 200) {
                setMessage(response.data.message);
                setTimeout(() => {
                    navigate("/restPass", { state: { email: email } });
                }, 1000);
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setLoading(false); // Set loading to false
        }
    };

    // Resend OTP function
    const resendOtp = async () => {
        setIsRunning(true);
        setSeconds(30);
        setOtp("");
        setResendLoading(true); // Set resend loading state
        console.log("Resending OTP...");

        try {
            await axios.post("http://localhost:8000/api/send-otp_second_time", {
                email: email,
            });
            console.log("OTP sent successfully.");
            setMessage("OTP has been resent to your email.");
        } catch (error) {
            console.error("Error sending OTP:", error);
            setMessage("Failed to resend OTP. Please try again.");
        } finally {
            setResendLoading(false); // Reset resend loading state
        }
    };

    return (
        <div className="container d-flex justify-content-center mt-5">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "450px", width: "100%" }}>
                <form onSubmit={handleSubmit}>
                    <h3 className="text-center">Reset Password</h3>
                    <h6 className="text-center mb-3">
                        Check your email and enter the OTP we&apos;ve sent you.
                    </h6>

                    {message && <p className="text-center text-danger">{message}</p>}

                    <div className="mb-3">
                        <input
                            className="form-control text-center"
                            type="text"
                            name="otp"
                            id="otp"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={handleInputChange}
                            maxLength="6"
                        />
                    </div>

                    <input type="hidden" name="email" value={email} />

                    <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
                        {loading ? "Loading..." : "Submit"}
                    </button>

                    <div className="row mt-1">
                        <div className="col-md-12">
                            <button
                                type="button"
                                className="btn btn-outline-primary w-100"
                                disabled={isRunning || resendLoading}
                                onClick={resendOtp}
                            >
                                {isRunning
                                    ? `Wait ${seconds} seconds`
                                    : resendLoading
                                    ? "Resending..."
                                    : "Resend OTP"}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReqOtp;

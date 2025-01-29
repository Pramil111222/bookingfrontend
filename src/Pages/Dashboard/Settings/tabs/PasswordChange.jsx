import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

function PasswordChange() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [oldPasswordVisible, setOldPasswordVisible] = useState(false); // Toggle visibility for the old password
    const [formData, setFormData] = useState({
        oldPassword: "",
        password: "",
        confirmPassword: "",
    });
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

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

    const toggleOldPasswordVisibility = () => {
        setOldPasswordVisible((prev) => !prev);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");

        if (token) {
            axios
                .post(
                    "http://127.0.0.1:8000/api/change-password",
                    {
                        oldPassword: formData.oldPassword,
                        password: formData.password,
                        password_confirmation: formData.confirmPassword,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
                .then((response) => {
                    setMessage(response.data.message);
                    setError("");
                    setFormData({ oldPassword: "", password: "", confirmPassword: "" });
                })
                .catch((err) => {
                    setError(err.response.data.error || "An error occurred");
                    setMessage("");
                });
        } else {
            setError("You are not logged in");
            setMessage("");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <form className="row acc" style={{ maxWidth: "500px", width: "100%" }} onSubmit={handleSubmit}>
                <h4 className="text-center">Password Change</h4>

                {message && <div className="alert alert-success">{message}</div>}
                {error && <div className="alert alert-danger">{error}</div>}

                <div className="mb-3">
                    <label className="form-label">Old Password</label>
                    <div className="input-group">
                        <input
                            type={oldPasswordVisible ? "text" : "password"}
                            className="form-control"
                            name="oldPassword"
                            value={formData.oldPassword}
                            onChange={handleInputChange}
                            placeholder="Enter your old password"
                            required
                        />
                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={toggleOldPasswordVisibility}
                        >
                            {oldPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>

                <div className="mb-3">
                    <label className="form-label">New Password</label>
                    <div className="input-group">
                        <input
                            type={passwordVisible ? "text" : "password"}
                            className="form-control"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your new password"
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
                    <label className="form-label">Confirm Password</label>
                    <div className="input-group">
                        <input
                            type={confirmPasswordVisible ? "text" : "password"}
                            className="form-control"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm your new password"
                            required
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

                <button type="submit" className="btn btn-primary w-100 mb-3">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default PasswordChange;

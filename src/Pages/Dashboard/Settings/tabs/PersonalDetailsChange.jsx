import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../API/apiConfig";


function PersonalDetailsChange() {
    const [userData, setUserData] = useState({ name: '', email: '', mobile: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the user is logged in
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/"); // Redirect to login if no token is found
        }
    }, [navigate]);

    useEffect(() => {
        // Fetch the logged-in user's data
        const token = localStorage.getItem("token");
        if (token) {
            axios
                .get(`${API_BASE_URL}user`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    const { user } = response.data;
                    setUserData({
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

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setSuccess('');

        const token = localStorage.getItem("token");
        if (token) {
            try {
                const response = await axios.put(
                    `${API_BASE_URL}user`, 
                    {
                        name: userData.name,
                        email: userData.email,
                        mobile: userData.mobile,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Success message
                setSuccess('Your details have been updated successfully!');
                setLoading(false);
            } catch (err) {
                // Handle error
                setError('Error updating user details.');
                setLoading(false);
            }
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center">
            <form
                className="row acc"
                style={{ maxWidth: "500px", width: "100%" }}
                onSubmit={handleSubmit}
            >
                <h4 className="text-center">Personal Details</h4>

                {error && <div className="alert alert-danger">{error}</div>}
                {success && <div className="alert alert-success">{success}</div>}

                <div className="mb-3">
                    <label className="form-label">User Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        value={userData.name}
                        onChange={(e) =>
                            setUserData({ ...userData, name: e.target.value })
                        }
                        placeholder="Enter your Name"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        readOnly
                        value={userData.email}
                        onChange={(e) =>
                            setUserData({ ...userData, email: e.target.value })
                        }
                        placeholder="Enter your Email"
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={userData.mobile}
                        onChange={(e) =>
                            setUserData({ ...userData, mobile: e.target.value })
                        }
                        placeholder="Enter your Mobile Number"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary w-100 mb-3"
                    disabled={loading}
                >
                    {loading ? 'Updating...' : 'Save Changes'}
                </button>
            </form>
        </div>
    );
}

export default PersonalDetailsChange;

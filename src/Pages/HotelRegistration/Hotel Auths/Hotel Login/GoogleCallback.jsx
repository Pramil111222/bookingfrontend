import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import API_BASE_URL from "../../../../API/apiConfig";

const GoogleCallback = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const [accessToken, setAccessToken] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${API_BASE_URL}auth/callback${location.search}`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setLoading(false);
            setData(data);
            setEmail(data.email);
            setAccessToken(data.token);
            
            if (data.token) {
                localStorage.setItem('token', data.token);
            }

            fetchUserData(data.token);
        })
        .catch(error => {
            setLoading(false);
            console.error('Error during callback fetch:', error);
        });
    }, [location.search]);

    const fetchUserData = (accessToken) => {
        if (!accessToken) {
            console.error('No access token available.');
            return;
        }
    
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
                    setUser({
                        name: user.name || 'User',
                        email: user.email || 'No email provided',
                    });
                })
                .catch((error) => {
                    console.error("Error fetching user data", error);
                    setUser({
                        name: 'User',
                        email: 'No email provided',
                    });
                });
        }
    };

    const goToDashboard = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/dashboard');
        } else {
            console.error('No token found! Redirecting to login...');
            navigate('/');
        }
    };

    if (loading) {
        return <DisplayLoading />;
    }

    return (
        <div style={styles.container}>
            <div style={styles.logo}>Bookingweek</div>
            <div style={styles.successIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 154 154">
                    <g fill="none" stroke="#22AE73" strokeWidth="2">
                        <circle cx="77" cy="77" r="72" style={{strokeDasharray:'480px, 480px', strokeDashoffset: '960px'}}></circle>
                        <circle id="colored" fill="#22AE73" cx="77" cy="77" r="72" style={{strokeDasharray:'480px, 480px', strokeDashoffset: '960px'}}></circle>
                        <polyline className="st0" stroke="#fff" strokeWidth="10" points="43.5,77.8 63.7,97.9 112.2,49.4" style={{strokeDasharray:'100px, 100px', strokeDashoffset: '200px'}} />
                    </g>
                </svg>
            </div>
            <h1 style={styles.heading}>Successfully Logged In</h1>
            {user && (
                <div style={styles.userInfo}>
                    <p>Welcome, {user.name}!</p>
                    <p>Email: {user.email}</p>
                </div>
            )}
            <button onClick={goToDashboard} style={styles.dashboardButton}>Go to Dashboard</button>
        </div>
    );
};

const DisplayLoading = () => (
    <div style={styles.loading}>Loading...</div>
);

const styles = {
    container: {
        fontFamily: 'Inter, sans-serif',
        background: 'linear-gradient(135deg, #f6f8f9 0%, #e5ebee 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        textAlign: 'center',
        color: '#333',
        padding: '20px',
    },
    logo: {
        marginBottom: '20px',
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#22AE73',
    },
    successIcon: {
        width: '150px',
        height: '150px',
        margin: '0 auto 30px',
    },
    heading: {
        fontSize: '24px',
        marginBottom: '15px',
        color: '#22AE73',
        fontWeight: '600',
    },
    userInfo: {
        marginBottom: '20px',
        color: '#666',
    },
    dashboardButton: {
        backgroundColor: '#22AE73',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    loading: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '20px',
    }
};

export default GoogleCallback;
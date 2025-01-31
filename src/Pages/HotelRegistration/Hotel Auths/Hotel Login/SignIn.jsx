import React, { useState, useEffect } from 'react';
import API_BASE_URL from '../../../../API/apiConfig';

function SignIn() {
    const [loginUrl, setLoginUrl] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE_URL}auth`, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Something went wrong!');
        })
        .then(data => setLoginUrl(data.url))
        .catch(error => console.error('Error fetching login URL:', error));
    }, []);

    return (
        <div>
            {loginUrl ? (
                <a href={loginUrl}>Google Sign In</a>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default SignIn;

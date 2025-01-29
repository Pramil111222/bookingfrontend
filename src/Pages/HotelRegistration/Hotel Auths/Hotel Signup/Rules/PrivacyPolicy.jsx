
const PrivacyPolicy = () => {
    const sectionStyle = {
        marginBottom: "20px",
    };

    const headingStyle = {
        color: "#2c3e50",
        textAlign: "center",
        marginBottom: "30px",
    };

    const subheadingStyle = {
        color: "#34495e",
        fontWeight: "bold",
        marginTop: "20px",
    };

    const textStyle = {
        color: "#2c3e50",
        lineHeight: "1.8",
    };

    const listStyle = {
        marginLeft: "20px",
    };

    return (
        <div className="container mt-5 mb-5">
            <h1 style={headingStyle}>Privacy Policy</h1>
            <p style={textStyle}><strong>Effective Date:</strong> 17/01/2025</p>
            <p style={textStyle}>
                At <a href="" style={{ textDecoration: 'none', color: 'blue' }}>HotelBooking.lk </a>, we prioritize your privacy and are committed to protecting
                your personal data in compliance with the General Data Protection Regulation
                (GDPR) and the California Consumer Privacy Act (CCPA). This Privacy Policy
                explains how we collect, use, and protect your information when you use our
                services.
            </p>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>1. Information We Collect</h3>
                <p style={textStyle}><strong>1.1 Personal Data:</strong> We may collect the following personal data:</p>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Payment information</li>
                    <li>Booking details (e.g., hotel name, dates, preferences)</li>
                    <li>Account credentials (if you create an account with us)</li>
                </ul>
                <p style={textStyle}><strong>1.2 Non-Personal Data:</strong> We may collect non-identifiable information such as:</p>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Browser type and version</li>
                    <li>IP address</li>
                    <li>Device type</li>
                    <li>Usage data (e.g., pages visited, time spent on our site)</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>2. How We Use Your Information</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Facilitate and process bookings.</li>
                    <li>Provide customer support and respond to inquiries.</li>
                    <li>Improve our platform and services.</li>
                    <li>Communicate promotions, updates, and other relevant information.</li>
                    <li>Comply with legal obligations and resolve disputes.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>3. Legal Bases for Processing (GDPR Compliance)</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li><strong>Consent:</strong> When you opt-in to receive communications or provide information voluntarily.</li>
                    <li><strong>Contractual Necessity:</strong> To fulfill bookings and provide our services.</li>
                    <li><strong>Legitimate Interests:</strong> To improve our platform, ensure security, and conduct business operations.</li>
                    <li><strong>Legal Obligations:</strong> To comply with applicable laws and regulations.</li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>4. Your Rights (GDPR and CCPA)</h3>
                <h5 style={{ ...textStyle, fontWeight: "bold" }}>Under GDPR</h5>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Access: Request access to your personal data.</li>
                    <li>Rectification: Correct any inaccurate or incomplete data.</li>
                    <li>Erasure: Request the deletion of your data ("Right to be Forgotten").</li>
                    <li>Restriction: Limit the processing of your data.</li>
                    <li>Portability: Receive a copy of your data in a machine-readable format.</li>
                    <li>Objection: Object to processing based on legitimate interests.</li>
                </ul>
                <h5 style={{ ...textStyle, fontWeight: "bold" }}>Under CCPA</h5>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Access: Know what personal data we have collected.</li>
                    <li>Deletion: Request the deletion of your personal data.</li>
                    <li>Opt-Out: Opt-out of the sale of your personal data (if applicable).</li>
                    <li>Non-Discrimination: Receive equal service and pricing, regardless of your privacy choices.</li>
                </ul>
                <p style={textStyle}>
                    To exercise any of these rights, please contact us at <a href="" style={{ textDecoration: 'none', color: 'blue' }}>support@hotelbooking.lk</a>.
                </p>
            </div>


            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>11. Contact Us</h3>
                <p style={textStyle}>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Email: <a href="" style={{ textDecoration: 'none', color: 'blue' }}>support@hotelbooking.lk</a></li>
                    <li>Address: 129/D.S. Senanayaka Street, Kandy, Sri Lanka</li>
                </ul>
            </div>
        </div>
    );
};

export default PrivacyPolicy;

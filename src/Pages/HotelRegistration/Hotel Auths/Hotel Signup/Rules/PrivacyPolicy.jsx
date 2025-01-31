const PrivacyPolicy = () => {
    const containerStyle = {
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "2rem 1rem",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    };

    const headerStyle = {
        textAlign: "center",
        marginBottom: "2.5rem",
        padding: "2rem",
        background: "linear-gradient(135deg, #2c3e50 0%, #3498db 100%)",
        borderRadius: "10px",
        color: "white",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
    };

    const sectionStyle = {
        marginBottom: "2rem",
        padding: "1.5rem",
        backgroundColor: "#ffffff",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
        transition: "transform 0.2s ease",
        ':hover': {
            transform: "translateY(-2px)"
        }
    };

    const subheadingStyle = {
        color: "#34495e",
        fontSize: "1.4rem",
        fontWeight: "600",
        margin: "2rem 0 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.5rem"
    };

    const textStyle = {
        color: "#4a5568",
        lineHeight: "1.7",
        fontSize: "1rem",
        marginBottom: "1rem"
    };

    const listStyle = {
        paddingLeft: "1.5rem",
        margin: "1rem 0"
    };

    const listItemStyle = {
        marginBottom: "0.8rem",
        position: "relative",
        paddingLeft: "1.2rem",
        '::before': {
            content: "'•'",
            color: "#3498db",
            position: "absolute",
            left: 0,
            fontWeight: "bold"
        }
    };

    return (
        <div style={containerStyle} className="privacy-policy">
            <header style={headerStyle}>
                <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Privacy Policy</h1>
                <p style={{ ...textStyle, color: "#e2e8f0", marginTop: "1rem" }}>
                    <strong>Effective Date:</strong> 17/01/2025
                </p>
            </header>

            <section style={sectionStyle}>
                <p style={textStyle}>
                    At <a href="/" style={{ color: "#3498db", fontWeight: "600" }}>HotelBooking.lk</a>,
                    we prioritize your privacy and are committed to protecting your personal data
                    in compliance with the General Data Protection Regulation (GDPR) and the California
                    Consumer Privacy Act (CCPA). This Privacy Policy explains how
                    we collect, use, and protect your information when you use our services.
                </p>
            </section>

            {/* Information We Collect */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>1. Information We Collect</h3>
                <p style={textStyle}>We may collect the following personal data when you use our platform</p>

                <h4 style={{ ...textStyle, fontWeight: "600" }}>1.1 Personal Data</h4>
                <ul style={listStyle}>
                    {['Name', 'Email address', 'Phone number', 'Payment information',
                        'Booking details (e.g., hotel name, dates, preferences)',
                        'Account credentials (if you create an account with us)'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>

                <h4 style={{ ...textStyle, fontWeight: "600" }}>1.2 Non-Personal Data</h4>
                <p style={textStyle}>We may collect non-identifiable information such as</p>
                <ul style={listStyle}>
                    {['Browser type and version', 'IP address', 'Device type',
                        'Usage data (e.g., pages visited, time spent on our site)'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* How We Use Information */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>2. How We Use Your Information</h3>
                <p style={textStyle}>We use your information to</p>
                <ul style={listStyle}>
                    {['Facilitate and process bookings',
                        'Provide customer support and respond to inquiries',
                        'Improve our platform and services',
                        'Communicate promotions, updates, and other relevant information',
                        'Comply with legal obligations and resolve disputes'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Legal Bases */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>3. Legal Bases for Processing (GDPR Compliance)</h3>
                <p style={textStyle}>Under GDPR, we process your personal data based on the following legal bases</p>
                <ul style={listStyle}>
                    {['Consent: When you opt-in to receive communications or provide information voluntarily',
                        'Contractual Necessity: To fulfill bookings and provide our services',
                        'Legitimate Interests: To improve our platform, ensure security, and conduct business operations',
                        'Legal Obligations: To comply with applicable laws and regulations'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Your Rights */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>4. Your Rights (GDPR and CCPA)</h3>

                <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                    <div>
                        <h5 style={{ ...textStyle, fontWeight: "600", color: "#2c3e50" }}>Under GDPR</h5>
                        <p style={textStyle}>You have the following rights</p>
                        <ul style={listStyle}>
                            {['Access: Request access to your personal data',
                                'Rectification: Correct any inaccurate or incomplete data',
                                'Erasure: Request the deletion of your data ("Right to be Forgotten")',
                                'Restriction: Limit the processing of your data',
                                'Portability: Receive a copy of your data in a machine-readable format',
                                'Objection: Object to processing based on legitimate interests'].map((item, index) => (
                                    <li key={index} style={listItemStyle}>{item}</li>
                                ))}
                        </ul>
                    </div>

                    <div>
                        <h5 style={{ ...textStyle, fontWeight: "600", color: "#2c3e50" }}>Under CCPA</h5>
                        <p style={textStyle}>You have the following rights</p>
                        <ul style={listStyle}>
                            {['Access: Know what personal data we have collected',
                                'Deletion: Request the deletion of your personal data',
                                'Opt-Out: Opt-out of the sale of your personal data (if applicable)',
                                'Non-Discrimination: Receive equal service and pricing'].map((item, index) => (
                                    <li key={index} style={listItemStyle}>{item}</li>
                                ))}
                        </ul>
                    </div>
                </div>
                <p style={textStyle}>
                    To exercise any of these rights, please contact us at {' '}
                    <a href="mailto:support@hotelbooking.lk" style={{ color: "#3498db" }}>
                        support@hotelbooking.lk
                    </a>.
                </p>
            </section>

            {/* Data Sharing */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>5. Data Sharing and Disclosure</h3>
                <p style={textStyle}>We do not sell your personal data. However, we may share your data with:</p>
                <ul style={listStyle}>
                    {['Service Providers: Third-party vendors who assist us in providing our services',
                        'Legal Authorities: When required to comply with legal obligations',
                        'Business Transfers: In the event of a merger, acquisition, or sale of assets'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Data Retention */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>6. Data Retention</h3>
                <p style={textStyle}>
                    We retain your personal data only for as long as necessary to:
                </p>
                <ul style={listStyle}>
                    {['Fulfill the purposes outlined in this Privacy Policy',
                        'Comply with legal obligations',
                        'Resolve disputes',
                        'Enforce our agreements'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Data Security */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>7. Data Security</h3>
                <p style={textStyle}>
                    We implement technical, administrative, and physical safeguards to protect your data from:
                </p>
                <ul style={listStyle}>
                    {['Unauthorized access',
                        'Disclosure',
                        'Alteration',
                        'Destruction'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
                <p style={textStyle}>
                    <em>Note: No method of transmission over the internet is completely secure.</em>
                </p>
            </section>

            {/* Cookies */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>8. Cookies and Tracking Technologies</h3>
                <p style={textStyle}>We use cookies to:</p>
                <ul style={listStyle}>
                    {['Enhance your user experience',
                        'Analyze site traffic and usage patterns',
                        'Deliver personalized content and advertisements'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
                <p style={textStyle}>
                    Manage preferences through your browser settings.
                </p>
            </section>

            {/* International Transfers */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>9. International Data Transfers</h3>
                <p style={textStyle}>
                    Your data may be transferred to and processed in:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>Sri Lanka</li>
                    <li style={listItemStyle}>Other countries where we operate</li>
                </ul>
                <p style={textStyle}>
                    By using our services, you consent to these transfers.
                </p>
            </section>

            {/* Policy Updates */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>10. Updates to This Policy</h3>
                <p style={textStyle}>
                    We may update this policy by:
                </p>
                <ul style={listStyle}>
                    <li style={listItemStyle}>Posting changes on this page </li>
                    <li style={listItemStyle}>Updating the effective date</li>
                </ul>
                <p style={textStyle}>
                    We encourage regular review of this policy.
                </p>
            </section>

            {/* Contact Section */}
            <section style={{ ...sectionStyle, backgroundColor: "#f8f9fa" }}>
                <h3 style={subheadingStyle}>11. Contact Us</h3>
                <div style={{ padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                    <p style={textStyle}>If you have any questions or concerns about this Privacy Policy, please contact us at</p>
                    <ul style={{ ...listStyle, listStyle: 'none', paddingLeft: 0 }}>
                        <li style={{ ...listItemStyle, '::before': { content: "none" } }}>
                            ✉️ <a href="mailto:support@hotelbooking.lk" style={{ color: "#3498db" }}>
                                support@hotelbooking.lk
                            </a>
                        </li>
                        <li style={{ ...listItemStyle, '::before': { content: "none" } }}>
                            📍 129/D.S. Senanayaka Street, Kandy, Sri Lanka
                        </li>
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default PrivacyPolicy;
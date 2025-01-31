const TermsAndConditions = () => {
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
        marginBottom: "1rem",
        textAlign: "justify"
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
        <div style={containerStyle} className="terms-and-conditions">
            <header style={headerStyle}>
                <h1 style={{ margin: 0, fontSize: "2.5rem" }}>Terms and Conditions</h1>
            </header>

            <section style={sectionStyle}>
                <p style={textStyle}>
                    Welcome to <strong> <a style={{ textDecoration: 'none' }} href=""> HotelBooking.lk! </a></strong>By registering your hotel with our platform,
                    you agree to abide by the terms and conditions outlined below. Please read them carefully,
                    as they govern your use of our services and the relationship between your hotel and HotelBooking.lk.
                </p>
            </section>

            {/* Partnership Agreement */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>1. Partnership Agreement</h3>
                <p style={textStyle}>
                    <strong>1.1.</strong> By registering your hotel with HotelBooking.lk, you agree to pay a <strong> 10% commission </strong> on every booking made through our platform
                </p>
                <p style={textStyle}>
                    <strong>1.2.</strong> In return, HotelBooking.lk will provide:
                </p>
                <ul style={listStyle}>
                    {['Technical support to ensure seamless operation',
                        'Promotion and marketing of your hotel to maximize bookings',
                        'Administrative support for managing bookings and customer interactions']
                        .map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Transparency and Trust */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>2. Transparency and Trust</h3>
                <p style={textStyle}>
                    <strong>2.1.</strong> HotelBooking.lk is committed to transparency and fostering trust between
                    our platform, hotels, and customers. As such, all bookings, transactions, and communications
                    must be conducted honestly and in good faith.
                </p>
                <p style={textStyle}>
                    <strong>2.2.</strong> Any violations of trust, including fraud, misrepresentation,
                    or failure to comply with our terms, may result in your hotel being
                    <strong> removed from the platform </strong> without prior notice.
                </p>
            </section>

            {/* QR Code System */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>3. QR Code System and Customer Cashback</h3>
                <p style={textStyle}>
                    <strong>3.1.</strong> . HotelBooking.lk is implementing a <strong> QR Code System</strong> to streamline the customer check-in and billing process.
                </p>
                <p style={textStyle}>
                    <strong>3.2.</strong> When a customer books through our platform and arrives at your hotel,
                    they must present their booking QR code at check-in. The hotel must scan the QR code to:
                </p>
                <ul style={listStyle}>
                    {['Start the session: Mark the customer’s attendance in our system',
                        'Confirm the customer’s arrival'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
                <p style={textStyle}>
                    <strong>3.3  </strong>
                    At checkout, the customer is eligible to receive a 1% cashback of the booking amount directly from the hotel counter,
                    provided they present their QR code. This 1% cashback will be deducted from our 10% commission,
                    and the hotel will remit 9% to HotelBooking.lk at the end of the transaction.
                </p>
                <p style={textStyle}>
                    <strong>3.4 </strong> Failure to follow the QR code process or refusal to provide the cashback may result in penalties or removal from the platform.
                </p>
            </section>

            {/* No-Show Policy */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>4. No-Show and Session Management</h3>
                <p style={textStyle}>
                    <strong>4.1 </strong> In the event of a no-show, the hotel must update the system to reflect the customer’s absence
                </p>
                <p style={textStyle}>
                    <strong>4.2 </strong> Accurate session management is essential for maintaining transparency and ensuring the integrity of our platform.
                </p>
                <p style={textStyle}>
                    <strong>4.3 </strong> Failure to update the system regarding no-shows or attendance may lead to investigations and possible sanctions.
                </p>
            </section>

            {/* Platform Rules */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>5. Platform Rules and Policies</h3>
                <p style={textStyle}>
                    <strong>5.1 </strong> By registering with HotelBooking.lk, you agree to comply with all platform rules and policies. These include:
                </p>
                <ul style={listStyle}>
                    {['Accurate representation of your hotel’s details, pricing, and availability',
                        'Honoring all confirmed bookings made through our platform',
                        'Providing high-quality service to all customers'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
                <p style={textStyle}>
                    <strong>5.2.</strong> HotelBooking.lk reserves the right to <strong> remove your hotel</strong> from the platform if you violate our terms, including but not limited to:
                </p>
                <ul style={listStyle}>
                    {['Dishonesty in dealings with customers',
                        'Refusal to honor bookings',
                        'Misuse of the QR code system or refusal to process cashback'].map((item, index) => (
                            <li key={index} style={listItemStyle}>{item}</li>
                        ))}
                </ul>
            </section>

            {/* Technical Support */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>6. Technical Support and Assistance</h3>
                <p style={textStyle}>
                    <strong>6.1 </strong> HotelBooking.lk will provide ongoing technical support to ensure your experience on our platform is smooth and efficient.
                </p>
                <p style={textStyle}>
                    <strong>6.2 </strong> Any issues or concerns must be reported promptly through our support channels.
                </p>
            </section>

            {/* Termination */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>7. Termination of Agreement</h3>
                <p style={textStyle}>
                    <strong>7.1 </strong>
                    Either party may terminate this agreement by providing written notice.
                    However, all obligations, including outstanding commissions, must be settled before termination.
                </p>
                <p style={textStyle}>
                    <strong>7.2 </strong> HotelBooking.lk reserves the right to terminate your participation immediately for any breach of these terms.
                </p>
            </section>

            {/* Amendments */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>8. Amendments</h3>
                <p style={textStyle}>
                    <strong>8.1 </strong> HotelBooking.lk reserves the right to update or modify these Terms and Conditions at any time.
                    Changes will be communicated via email and updated on our platform.
                </p>
                <p style={textStyle}>
                    <strong>8.2 </strong> Continued use of our platform after amendments indicates your acceptance of the revised terms.
                </p>
            </section>

            {/* Governing Law */}
            <section style={sectionStyle}>
                <h3 style={subheadingStyle}>9. Governing Law</h3>
                <p style={textStyle}>
                    <strong>9.1 </strong> These Terms and Conditions are governed by the laws of Sri Lanka. Any disputes arising from this agreement will be resolved under the jurisdiction of Sri Lankan courts.
                </p>
            </section>

            {/* Contact Section */}
            <section style={{ ...sectionStyle, backgroundColor: "#f8f9fa" }}>
                <h3 style={subheadingStyle}>Contact Information</h3>
                <div style={{ padding: "1.5rem", border: "1px solid #e2e8f0", borderRadius: "8px" }}>
                    <p style={textStyle}>By registering your hotel on HotelBooking.lk, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.</p>
                    <p style={textStyle}>For any inquiries or assistance, please contact our support team:</p>
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

export default TermsAndConditions;
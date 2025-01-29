
const TermsAndConditions = () => {
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
            <h1 style={headingStyle}>Terms and Conditions</h1>
            <p style={textStyle}>
                Welcome to HotelBooking.lk! By registering your hotel with our platform, you
                agree to abide by the terms and conditions outlined below. Please read them
                carefully, as they govern your use of our services and the relationship
                between your hotel and <a href="" style={{ textDecoration: 'none', color: 'blue' }}>HotelBooking.lk</a>
            </p>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>1. Partnership Agreement</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>
                        By registering your hotel with HotelBooking.lk, you agree to pay a 10%
                        commission on every booking made through our platform.
                    </li>
                    <li>
                        In return, HotelBooking.lk will provide:
                        <ul style={listStyle}>
                            <li>Technical support to ensure seamless operation.</li>
                            <li>Promotion and marketing of your hotel to maximize bookings.</li>
                            <li>
                                Administrative support for managing bookings and customer interactions.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>2. Transparency and Trust</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>
                        HotelBooking.lk is committed to transparency and fostering trust between
                        our platform, hotels, and customers. As such, all bookings,
                        transactions, and communications must be conducted honestly and in good
                        faith.
                    </li>
                    <li>
                        Any violations of trust, including fraud, misrepresentation, or failure
                        to comply with our terms, may result in your hotel being removed from
                        the platform without prior notice.
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>3. QR Code System and Customer Cashback</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>
                        HotelBooking.lk is implementing a QR Code System to streamline the
                        customer check-in and billing process.
                    </li>
                    <li>
                        When a customer books through our platform and arrives at your hotel,
                        they must present their booking QR code at check-in. The hotel must
                        scan the QR code to:
                        <ul style={listStyle}>
                            <li>Start the session: Mark the customer’s attendance in our system.</li>
                            <li>Confirm the customer’s arrival.</li>
                        </ul>
                    </li>
                    <li>
                        At checkout, the customer is eligible to receive a 1% cashback of the
                        booking amount directly from the hotel counter, provided they present
                        their QR code. This 1% cashback will be deducted from our 10%
                        commission, and the hotel will remit 9% to HotelBooking.lk at the end
                        of the transaction.
                    </li>
                    <li>
                        Failure to follow the QR code process or refusal to provide the cashback
                        may result in penalties or removal from the platform.
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>4. No-Show and Session Management</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>
                        In the event of a no-show, the hotel must update the system to reflect
                        the customer’s absence.
                    </li>
                    <li>
                        Accurate session management is essential for maintaining transparency
                        and ensuring the integrity of our platform.
                    </li>
                    <li>
                        Failure to update the system regarding no-shows or attendance may lead
                        to investigations and possible sanctions.
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>5. Platform Rules and Policies</h3>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>
                        By registering with HotelBooking.lk, you agree to comply with all
                        platform rules and policies. These include:
                        <ul style={listStyle}>
                            <li>
                                Accurate representation of your hotel’s details, pricing, and
                                availability.
                            </li>
                            <li>Honoring all confirmed bookings made through our platform.</li>
                            <li>Providing high-quality service to all customers.</li>
                        </ul>
                    </li>
                    <li>
                        HotelBooking.lk reserves the right to remove your hotel from the
                        platform if you violate our terms, including but not limited to:
                        <ul style={listStyle}>
                            <li>Dishonesty in dealings with customers.</li>
                            <li>Refusal to honor bookings.</li>
                            <li>
                                Misuse of the QR code system or refusal to process cashback.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>9. Governing Law</h3>
                <p style={textStyle}>
                    These Terms and Conditions are governed by the laws of Sri Lanka. Any
                    disputes arising from this agreement will be resolved under the
                    jurisdiction of Sri Lankan courts.
                </p>
            </div>

            <div style={sectionStyle}>
                <h3 style={subheadingStyle}>Contact Us</h3>
                <p style={textStyle}>
                    For any inquiries or assistance, please contact our support team at:
                </p>
                <ul style={{ ...textStyle, ...listStyle }}>
                    <li>Email: <a href="" style={{ textDecoration: 'none', color: 'blue' }}>support@hotelbooking.lk</a></li>
                </ul>
            </div>
        </div>
    );
};

export default TermsAndConditions;

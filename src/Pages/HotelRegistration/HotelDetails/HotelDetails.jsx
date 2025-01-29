import React, { useState } from "react";
import "./HotelDetails.css"; // Add styles for responsiveness
import { Link } from "react-router-dom";

const HotelDetails = () => {
  const [formData, setFormData] = useState({
    hotelName: "",
    address: "",
    tel: "",
    mobile: "",
    mobile2: "",
    location: "",
    email: "",
    rate: "",
    city: "",
    district: "",
    country: "",
    images: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({ ...prevData, images: e.target.files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Handle navigation or form submission logic here
  };

  return (
    <div className="form-container">
      <h2>Hotel Registration</h2>

      <form onSubmit={handleSubmit} className="hotel-details-form">
        <div className="group-1">
          <div className="form-group">
            <label>Hotel Name</label>
            <input
              type="text"
              name="hotelName"
              value={formData.hotelName}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="form-group">
            <label>Telephone</label>
            <input
              type="tel"
              name="tel"
              value={formData.tel}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Mobile</label>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              className="form-control"
              onChange={handleInputChange}
              // required
            />
          </div>
          <div className="form-group">
            <label>Mobile 2</label>
            <input
              type="tel"
              name="mobile2"
              className="form-control"
              value={formData.mobile2}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              className="form-control"
              value={formData.location}
              onChange={handleInputChange}
              // required
            />
          </div>
        </div>

        <div className="group-1">
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="form-group">
            <label>Rate</label>
            <input
              type="number"
              name="rate"
              value={formData.rate}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="form-group">
            <label>City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="form-control"
              // required
            />
          </div>
          <div className="form-group">
            <label>District</label>
            <input
              type="text"
              name="district"
              value={formData.district}
              className="form-control"
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              className="form-control"
              onChange={handleInputChange}
              // required
            />
          </div>
          <div className="form-group">
            <label>Hotel Images</label>
            <input
              type="file"
              name="images"
              className="form-control"
              onChange={handleFileChange}
              multiple
              accept="image/*"
            />
          </div>
          <div className="form-group-buttons">
            <button type="reset" className="next-button btn btn-danger text-white">Clear</button>
          <button type="submit" className="next-button btn btn-primary text-white"> <Link to='/roomDetails'>Next </Link></button> 
          </div>
        </div>
      </form>
    </div>
  );
};

export default HotelDetails;

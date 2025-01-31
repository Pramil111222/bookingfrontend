import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import API_BASE_URL from "../../../../API/apiConfig";

function HotelDetailsChange() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ id: null, name: "", email: "", mobile: "" });
  const [formData, setFormData] = useState({
    hotelName: "",
    hotelEmail: "",
    mobileNumber: "",
    tp: "",
    location: "",
    userId: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
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
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
          });
  
          setFormData((prevData) => ({ ...prevData, userId: user.id }));
        })
        .catch((error) => {
          console.error("Error fetching user data", error);
        });
    }
  }, []);
  

  useEffect(() => {
    if (userData.id) {
      fetchHotelDetails(userData.id);
    }
  }, [userData.id]);

  const fetchHotelDetails = async (userId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}hotels/user/${userId}`);
      const hotel = response.data.hotel;

      setFormData({
        hotelName: hotel.hotel_name || "",
        hotelEmail: hotel.hotel_email || "",
        mobileNumber: hotel.hotel_mobile || "",
        tp: hotel.hotel_telephone || "",
        location: hotel.hotel_location || "",
        userId,
      });
    } catch (error) {
      console.error("Error fetching hotel details:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Ensure userId is not null before submitting
    if (!formData.userId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "User ID is missing. Please try again.",
      });
      return;
    }
  
    try {
      console.log("Submitting form data:", formData);
      
      const response = await axios.post(`${API_BASE_URL}hotels`, formData);
  
      Swal.fire({
        icon: "success",
        title: "Success",
        text: response.data.message,
      });
  
      fetchHotelDetails(userData.id);
    } catch (error) {
      console.error("Submission error:", error.response?.data);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred. Please try again.",
      });
    }
  };
  

  return (
    <form className="row acc" onSubmit={handleSubmit}>
      <h3 className="fw-bold">My Account</h3>

      <div className="col-md-6 mt-2 mb-3">
        <label className="form-label">Hotel Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Hotel Name"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mt-2 mb-3">
        <label className="form-label">Hotel Email</label>
        <input
          type="email"
          className="form-control"
          name="hotelEmail"
          value={formData.hotelEmail}
          onChange={handleChange}
          placeholder="Enter Hotel Email"
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Mobile Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Mobile Number"
          name="mobileNumber"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Telephone Number</label>
        <input
          type="text"
          className="form-control"
          placeholder="Telephone Number"
          name="tp"
          value={formData.tp}
          onChange={handleChange}
        />
      </div>

      <div className="col-md-6 mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          placeholder="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />

      <input
          type="hidden"
          className="form-control"
          placeholder="userId"
          name="userId"
          value={userData.id}
          onChange={handleChange}
        />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-secondary">
          Save
        </button>
      </div>
    </form>
  );
}

export default HotelDetailsChange;

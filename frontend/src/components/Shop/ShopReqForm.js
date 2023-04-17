import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CreateShop } from "../../actions/shopAction";
import "./ShopReqForm.css";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

function ShopReqForm() {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { Shoprequest,sucess, loading, error } = useSelector(
    (state) => state.shopRequest
  );
  const [formData, setFormData] = useState({
    shopLiscNo: "",
    shopName: "",
    ownerName: "",
    location: {
      type: "Point",
      coordinates: [0,0],
    },
    address: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "latitude") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          coordinates: [
            parseFloat(e.target.value),
            formData.location.coordinates[1],
          ],
        },
      });
    } else if (e.target.name === "longitude") {
      setFormData({
        ...formData,
        location: {
          ...formData.location,
          coordinates: [
            formData.location.coordinates[0],
            parseFloat(e.target.value),
          ],
        },
      });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(CreateShop(formData));
    // navigate('/');
    // formData.latitude="";
    // formData.longitude="";
    setFormData({
      shopLiscNo: "",
      shopName: "",
      ownerName: "",
      address: "",
      location: {
        type: "Point",
        coordinates: [],
        address: "",
      },
       latitude:"",

      email: "",
    });
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (sucess===true) {
      alert.success("Request Send Succesfully!");
    }
  }, [dispatch, error, loading]);
  return (
    <div className="ShopReqFormContainer">
      <h2 className="productsHeading">Create Your Shop</h2>
      <img src="https://mydukaan.io/images/og-images/og-selling-online.jpg"/>
      <p>
                  Our easy-to-use platform allows shopkeepers to create a customized online store that reflects their brand and showcases their products. They can upload product images, descriptions, and pricing, and manage orders and inventory all in one place. Dukaan's user-friendly interface requires no technical expertise, making it accessible for all shopkeepers..</p>

      <div className="ServiceContentPoint">
        <div className="ListContainer">
          <ul className="List1">
            <li  className="li1">
              <BsFillCheckCircleFill />
              <h4>Performance</h4>

            </li>
            <li className="li1">
              <BsFillCheckCircleFill />
              <h4>Security</h4>   
            </li>
          </ul>
          <ul className="List2">
            <li className="li1">
              <BsFillCheckCircleFill />
              <h4>Profit</h4>
            </li>
            <li className="li1">
              <BsFillCheckCircleFill />
              <h4>Reliability</h4>
            </li>    
          </ul>
        </div>
        </div>


    <div className="form-container">
      <h1>Create Shop Request</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="shopLiscNo">Shop License No:</label>
          <input
            type="text"
            id="shopLiscNo"
            name="shopLiscNo"
            value={formData.shopLiscNo}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="shopName">Shop Name:</label>
          <input
            type="text"
            id="shopName"
            name="shopName"
            value={formData.shopName}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            value={formData.ownerName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="shopEmail">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="text"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="text"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
          />
        </div>

      

        <button className="ShopreqButton" type="submit">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
}

export default ShopReqForm;

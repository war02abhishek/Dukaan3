import React, { Fragment, useEffect, useState } from "react";
import MetaData from "../Layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Layout/Loader/Loader";
import { Link } from "react-router-dom";
import "./PrimeShop.css";
import { Button } from "@material-ui/core";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { getNearByShops } from "../../actions/shopAction";
import ShopInfoCard from "./ShopInfoCard";
import { BsFillCheckCircleFill } from "react-icons/bs";

import Slider from "../Layout/Carousel/Slider";


const PrimeShop = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const alert = useAlert();
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);
  const { shop, error, loading } = useSelector((state) => state.getNearBy);
  // useEffect(() => {
  //   if (isAuthenticated === false) {
  //     navigate("/login");
  //   }
  // }, [navigate, isAuthenticated]);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          alert.error(error);
        }
      );
    }
    if (error) {
      alert.error(error);
    }
  }, [error, dispatch]);
  const handleSubmit = (e) => {
    //  e.preventDefault();
    console.log(latitude, longitude);
    dispatch(getNearByShops(latitude, longitude));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="PrimeContainer">
             <h2 className="productsHeading">Prime Features</h2>

                <img src="https://play-lh.googleusercontent.com/U0zCLDestudntuhA-cOCm6CBuKFyUv89duIySNjiRGt0s3wZxRXg_i2dqP9qfqI5ndg=w526-h296-rw"/>
             <div className="PrimeSubContainer">

              <div className="ServiceContentPoint">
                <div className="ListContainer">
                  <ul className="List1">
                    <li className="li1">
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
                <p>Welcome to Dukaan, the online platform that empowers shopkeepers to create their own online store in minutes. With Dukaan, shopkeepers can reach a wider audience and sell their products online, while customers can browse and purchase products from their favorite local shops without leaving their homes.


                  Our easy-to-use platform allows shopkeepers to create a customized online store that reflects their brand and showcases their products. They can upload product images, descriptions, and pricing, and manage orders and inventory all in one place. Dukaan's user-friendly interface requires no technical expertise, making it accessible for all shopkeepers.</p>
             </div>

                <Link to="/shopreq"
                  className="ShopOfferButton"
                  color="primary"
                >
                  Create your Shop
                </Link>
             <div className="PrimeSubConatiner2">
                <img src="https://raw.githubusercontent.com/Tahasadiki/Nearby-Stores/dev/NearbyShopsAppPreview.png" />

                <p>At Dukaan, we understand the importance of supporting local businesses and making it easier for customers to shop locally. That's why we have included a feature that allows customers to find nearby local shops and purchase products from them online.

                  Our platform uses geolocation technology to identify local shops in the customer's area. Customers can browse through the list of shops and view their product offerings, store hours, and customer reviews. They can then place an order for products they wish to purchase, pay online and choose to either pick up the products themselves or have them delivered to their doorstep.
                  </p>
                  <p>
                  This feature is a win-win for both customers and local shops. Customers can conveniently shop from their favorite local shops without leaving their homes, while local shops can expand their customer base and increase their sales through our platform.

                  Additionally, this feature also helps promote sustainable shopping habits by reducing the carbon footprint of shipping products from faraway warehouses. It encourages customers to shop locally, supporting their local economy and reducing the impact of transportation on the environment.</p>

                <button
                  className="ShopOfferButton"
                  onClick={handleSubmit}
                  color="primary"
                >
                  Get NearBy Shops
                </button>

            <span> Here we available near you (with in 10km radius) </span>
             </div>


          </div>
          <div className="ShopinfoConatiner">
            {shop && shop.length > 0 ? (
              shop.map((item) => <ShopInfoCard key={item.id} {...item} />)
            ) : (
               shop && shop.length==0 &&  <p>Currently Not available!</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default PrimeShop;

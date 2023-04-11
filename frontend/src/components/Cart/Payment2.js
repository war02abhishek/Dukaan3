import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createOrder } from "../../actions/orderAction";
import "./Payment.css";

const Payment2 = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const userl = JSON.parse(localStorage.getItem("user"));
  const alert = useAlert();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };
  const [razorpayKey, setRazorpayKey] = useState("");
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    axios.get("/api/v1/razorpay/key").then((res) => {
      setRazorpayKey(res.data.razorpayKey);
    });
  }, []);

  const openStripe = () => {
    navigate("/process/stripe/payment");
  };
  const openCheckoutHandler = async () => {
    const response = await axios.post("/api/v1/razorpay/create", {
      amount: Math.round(orderInfo.totalPrice * 100), // in paise (50000 paise = 500 INR)
    });
    setOrderId(response.data.order_id);
  };
  useEffect(() => {
    console.log("CheckOut called");
    openCheckout();
  }, [orderId]);

  const openCheckout = async () => {
    const options = {
      key: razorpayKey,
      amount: orderInfo.totalPrice * 100, // in paise (50000 paise = 500 INR)
      order_id: orderId,
      name: userl.firstName,
      description: "Purchase Description",
      image: "https://pixlr.com/images/index/remove-bg.webp",

      handler: function (response) {
        console.log(response);
        order.paymentInfo = {
          id: response.razorpay_payment_id,
          status: "succeeded",
        };
        navigate("/success");
        dispatch(createOrder(order));
        alert.success("Payment Succesfull");
      },
      prefill: {
        name: "John Doe",
        email: "john@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "This is sample address",
      },
      theme: {
        color: "#f3b925",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="Payment2Contianer">
      <h1 className="PayGateway">Choose Payment Gateway</h1>
      <div className="Payment2btnContainer">
        <button className="OpenCheckoutBtn" onClick={openCheckoutHandler}>
          RazoPay Payment
        </button>
        <button className="OpenCheckoutBtn" onClick={openStripe}>
          Stripe Payment
        </button>
      </div>
    </div>
  );
};

export default Payment2;

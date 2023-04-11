import express from "express";
import mongoose from "mongoose";
import Razorpay from "razorpay"
const router = express.Router();
import Stripe from "stripe"
const stripe = new Stripe(
  "sk_test_51Kpv6vSBDb6ISOz8lzJyujjA9Z4PLyGNZiCM4KE06MVqWQCdmVMeyBKDFbVwIH7MZuP64PGQuX2qlMqKzEhiDL8Q00BrbiyGj7"
);


export  const processPayment = async (req, res, next) => {
  try {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "inr",
      metadata: {
        company: "Ecommerce",
      },
    });

    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//main use of API_KEY is in front end but we kept it in config so that we can change in future and its secure so no issue
export const sendStripeApiKey =(async (req, res, next) => {

  try {
     res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
    
  } catch (error) {
       res.status(404).json({ message: error.message });
  }

 
});



export const sendRazoPayApiKey = async (req, res, next) => {
  try {
    
     res.json({
       razorpayKey: process.env.RAZOPAY_API_KEY,
     });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const processRazoPayment = async (req, res, next) => {
  try {
     const amount = req.body.amount;
     
     const options = {
    amount: amount,
    currency: 'INR',
    receipt: 'order_rcptid_11',
    payment_capture: 1,
  };

  const instance = new Razorpay({
    key_id: process.env.RAZOPAY_API_KEY,
    key_secret:process.env.RAZOPAY_KEY_SECRET,
  });

  instance.orders.create(options, function (err, order) {
    if (err) {
      console.error(err);
      return res.status(500).send("Error creating order");
    }
    return res.json({
      order_id: order.id,
    });
  });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


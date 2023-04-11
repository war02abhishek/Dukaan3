import express from "express";

const router = express.Router();
import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";
import {
  processPayment,
  processRazoPayment,
  sendRazoPayApiKey,
  sendStripeApiKey,
} from "../controllers/PaymentController.js";

router.post("/payment/process", isAuthenticatedUser,processPayment);
router.get("/stripeapikey", isAuthenticatedUser,sendStripeApiKey);

router.post("/razorpay/create",isAuthenticatedUser,processRazoPayment);
router.get("/razorpay/key",isAuthenticatedUser,sendRazoPayApiKey);


export default router;
import express from "express";

const router = express.Router();
import {
  CreateShop,
  CreateShopProduct,
  GetShopDetail,
  getAllShops,
  getNearByShops,
  // getShopProducts,
} from "../controllers/ShopController.js";
import { getShopProducts } from "../controllers/ProductController.js";

import { isAuthenticatedUser, AuthenticatedRole } from "../middleware/auth.js";

router.post("/reqshop", isAuthenticatedUser, CreateShop);
router.post("/createshopProduct", isAuthenticatedUser,CreateShopProduct);
router.get("/getshopdetail",isAuthenticatedUser,GetShopDetail);
router.post("/getNearByshops", isAuthenticatedUser, getNearByShops);
router.get("/getShopProducts/:id", isAuthenticatedUser, getShopProducts);
router.get("/getAllShops",isAuthenticatedUser,AuthenticatedRole("admin"),getAllShops);


export default router;
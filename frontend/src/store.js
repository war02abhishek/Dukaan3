import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productsReducer,
  productDetailsReducer,
  newReviewReducer,
  productReducer,
  newProductReducer,
  
} from "./reducers/productReducer";
import {
  userReducer,
  profileReducer,
  allUsersReducer,
  userDetailsReducer,
  forgotPasswordReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  orderReducer,
  allOrdersReducer,
  orderDetailsReducer,
  myOrdersReducer,
  newOrderReducer,
} from "./reducers/orderReducer";
import {
  ShopRequestReducer,
  getNearByShopsReducer,
  getShopProductsReducer,
} from "./reducers/shopReducer";

const reducer = combineReducers({
  products: productsReducer,
  product: productReducer,
  productDetails: productDetailsReducer,
  newReviewReducer: newReviewReducer,
  userReducer: userReducer,
  profileR: profileReducer,
  cart: cartReducer,

  allOrders: allOrdersReducer,
  order: orderReducer,
  orderDetails: orderDetailsReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,

  allUsers: allUsersReducer,
  userDetail: userDetailsReducer,
  newProduct: newProductReducer,

  forgotPassword: forgotPasswordReducer,
  shopRequest: ShopRequestReducer,
  getNearBy: getNearByShopsReducer,
  getShopProduct: getShopProductsReducer,
});


let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleWare=[thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleWare))
);

export default store;
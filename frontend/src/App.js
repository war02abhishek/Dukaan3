import React, { useEffect, useState } from "react";
import Header from "./components/Layout/Header/Header.js";
import "./App.css";
import webfont from "webfontloader";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Redirect,
  Link,
} from "react-router-dom";
import Footer from "./components/Layout/Footer/Footer.js";
import Home from "./components/Home/Home.js";
import ProductDetail from "./components/Product/ProductDetail";
import SideNav from "./components/Layout/Header/SideNav.js";
import Products from "./components/Product/Products.js";
import Search from "./components/Product/Search.js";
import LoginSignUp from "./components/User/LoginSignUp.js";
import About from "./components/About/About.js";

import Profile from "./components/User/Profile.js";
import ProtectedRoute from "./components/Route/ProtecedRoute.jsx";
import { useSelector } from "react-redux";
import Cart from "./components/Cart/Cart.js";
import UpdateProfile from "./components/User/UpdateProfile.js";
import ChangePass from "./components/User/ChangePass.js";

import { LOAD_USER_SUCCESS } from "./constants/userConstant";
import { useDispatch } from "react-redux";
import { loadUser } from "./actions/userAction";
import store from "./store";
import UserOptions from "./components/Layout/Header/UserOptions.js";
import Shipping from "./components/Cart/Shipping.js";
import ConfirmOrder from "./components/Cart/ConfirmOrder.js";
import axios from "axios";
import Payment from "./components/Cart/Payment.js";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ElementsLayout from "./ElementsLayout.js";
import OrderSuccess from "./components/Cart/OrderSucess.js";
import MyOrders from "./components/Order/MyOrder.js";
import OrderDetails from "./components/Order/OrderDetails.js";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Dashboard from "./components/Admin/Dashboard.js";
import UsersList from "./components/Admin/UserList.js";
import OrderList from "./components/Admin/OrderList.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct.js";
import UpdateProduct from "./components/Admin/UpdateProduct.js";
import UpdateUser from "./components/Admin/UpdateUser.js";
import UpdatePassword from "./components/User/UpdatePassword.js";
import UpdateOrder from "./components/Admin/UpdateOrderP.js";
// import LocationMap from "./components/LocationMap/LocationMap.js";
// import LocationM from "./components/LocationMap/LocationMap2.js";
// import LocationMap3 from "./components/LocationMap/LocationMap3.js";
// import LocationMap4 from "./components/LocationMap/LocationMap4.js";
import Payment2 from "./components/Cart/Payment2.js";
// import ForgotPassword from "./components/User/ForgotPassword.js";
import ForgotPassword2 from "./components/User/ForgotPassword2.js";
import ResetPasswordForm from "./components/User/ResetPasswordForm.js";
import Footer2 from "./components/Layout/Footer2/Footer2.js";
import ShopReqForm from "./components/Shop/ShopReqForm.js"
import CreateShopProduct from "./components/Shop/CreateShopProduct.js"
import MyStore from "./components/Shop/MyStore.js"
import PrimeShop from "./components/Shop/PrimeShop.js";
import ShopProducts from "./components/Shop/ShopProducts.js";
import ShopOrder from "./components/Shop/ShopOrder.js";
import MyStoreProducts from "./components/Shop/MyStoreProducts.js";

function App() {
  console.log("App.js");
  const dispatch = useDispatch();
  const [stripeApiKey, setStripeApiKey] = useState("");
  // const { isSidebarOpen, closeSidebar } = useGlobalContext();


  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    console.log(data);
    setStripeApiKey(data.stripeApiKey);
  }

  // const user = JSON.parse(localStorage.getItem("user"));
  // console.log("user", user);
  const { user, isAuthenticated } = useSelector((state) => state.userReducer);

  useEffect(() => {
    webfont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
    // var userl=JSON.parse(localStorage.getItem("user"));
    //   console.log(userl);
    // if(userl !==null)
    // {
    //     dispatch({ type:LOAD_USER_SUCCESS, payload: userl});
    // }
  }, []);

  return (
    <GoogleOAuthProvider
      clientId={
        "722271786835-ic9jcohlh11b90qc4h11mhpktv23klb1.apps.googleusercontent.com"
      }
    >
      <Router>
        <Header />

        <SideNav />
        {isAuthenticated && <UserOptions user={user} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/Products" element={<Products />} />
          <Route path="/Products/search" element={<Products />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/Login" element={<LoginSignUp />} />
          <Route path="/About" element={<About />} />
          <Route path="/Cart" element={<Cart />} />
          {/* <Route element={<ProtectedRoute />}> */}
          {/* <Route path="/Profile" element={<Profile />} /> */}
          <Route path="/Profile" element={<Profile />} />
          <Route path="/login/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />

          {/* <Route path="/process/payment" element={<Payment />} /> */}
          {/* <Elements stripe={loadStripe}>
          <Route path="/process/payment" element={<Payment />} />
        </Elements> */}

          {stripeApiKey && (
            <Route
              element={<ElementsLayout stripe={loadStripe(stripeApiKey)} />}
            >
              <Route path="/process/stripe/payment" element={<Payment />} />
            </Route>
          )}

          <Route path="/process/payment" element={<Payment2 />} />
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDetails />} />

          {/* <Route
          path="/Profile"
          element={<ProtectedRoute component={<Profile />} />}
        ></Route> */}
          {/* </Route> */}

          {/* <ProtectedRoute path="/Profile" element={<Profile />} /> */}
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />

          {/* <Route path="/password/update" element={<ChangePass />} />
      <Route path="/login?redirect=shipping" element={<ChangePass />} /> */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="admin/product" element={<NewProduct />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/product/:id" element={<UpdateProduct />} />
          <Route path="/admin/user/:id" element={<UpdateUser />} />
          <Route path="/admin/order/:id" element={<UpdateOrder />} />
          {/* <Route path="/location" element={<LocationMap/>}/> */}
          {/* <Route path="/lop" element={<LocationM/>}/> */}
          {/* <Route path="/lopp" element={<LocationMap3 />} />
          <Route path="/duk" element={<LocationMap4 />} /> */}
          {/* <Route path="/forgot/password" element={<ForgotPassword/>}/> */}
          <Route path="/forgot/password" element={<ForgotPassword2 />} />
          <Route
            path="/password/reset/:oobCode"
            element={<ResetPasswordForm />}
          />

          <Route path="/shopreq" element={<ShopReqForm/>}/>
          <Route path="/mystore" element={<MyStore/>}/>

          <Route path="/createShopProduct" element={<CreateShopProduct/>}/>
          <Route path="/PrimeShop" element={<PrimeShop/>}/>
          <Route path="/PrimeShop/:id" element={<ShopProducts/>}/>
          <Route path="/shopOrders" element={<ShopOrder/>}/>
          <Route path="/ShopProduct/:id" element={<MyStoreProducts/>} />











        </Routes>

        {/* <Footer /> */}
        <Footer2/>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;

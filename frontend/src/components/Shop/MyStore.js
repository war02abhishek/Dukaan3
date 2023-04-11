import React, { useEffect, useState } from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productActions.js";
import { getAllOrders } from "../../actions/orderAction.js";
import { getAllUsers, loadUser } from "../../actions/userAction.js";
import MetaData from "../Layout/MetaData";
import { getShopDetails } from "../../actions/shopAction.js";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button } from "@material-ui/core";

import { Chart as ChartJS } from "chart.js/auto";
import { Chart } from "react-chartjs-2";
import CountUp from "react-countup";
import ScrollTrigger from "react-scroll-trigger";
import { useNavigate } from "react-router-dom";
import { deleteProduct } from "../../actions/productActions.js";
import "./MyStore.css";

const MyStore = () => {
  const dispatch = useDispatch();
  const [counterOn, setCounterOn] = useState(false);
  const navigate = useNavigate();

  const { loading, shop } = useSelector((state) => state.shopRequest);
  const { orders } = useSelector((state) => state.allOrders);

  const { user } = useSelector((state) => state.userReducer);

  let outOfStock = 0;
  //  const {products} = Shop;

  shop && shop.products &&
    shop.products.forEach((item) => {
      if (item.Stock <= 0) {
        outOfStock += 1;
      }
    });
  const deleteProductHandler = (id) => {
    console.log("deleting shop product: " + id)
    dispatch(deleteProduct(id));
  };

  useEffect(() => {

    dispatch(getShopDetails()); //use.email doesnt work
    // }
  }, []);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <EditIcon />
            </Link>

            <Button
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </>
        );
      },
    },
  ];

  const rows = [];

  shop?.products &&
    shop?.products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
      });
    });
  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, shop?.products?.length - outOfStock],
      },
    ],
  };
  return (
    <div className="Sdashboard">
      <MetaData title="Dashboard - Shop Panel" />
      <div className="SdashboardContainer">
        <Typography component="h1">MY STORE</Typography>
        <div className="ButtonCreate">
          <Link className="OfferButton" to={`/ShopProduct/${shop?.shopLiscNo}`}>
            Products
          </Link>
          <Link className="OfferButton" to="/shopOrders">
            Orders
          </Link>
        </div>
        <div className="ShopinfoDashboard">
          <div className="Shopinfocontainer">
            <h1>ShopName:</h1>
            <h2>{shop?.shopName}</h2>
          </div>
        </div>
        <div className="ShopinfoDashboard">
          <div className="Shopinfocontainer">
            <h1>Shop Lisc No:</h1>
            <h2>{shop?.shopLiscNo}</h2>
          </div>
        </div>
        <div className="ShopinfoDashboard">
          <div className="Shopinfocontainer">
            <h1>Location:</h1>
            <h2>{shop?.address}</h2>
          </div>
        </div>
        <div className="ShopinfoDashboard">
          <div className="Shopinfocontainer">
            <h1>Owner Name:</h1>
            <h2>{shop?.ownerName}</h2>
          </div>
        </div>
        <div className="ShopinfoDashboard">
          <div className="Shopinfocontainer">
            <h1>Email:</h1>
            <h2>{shop?.email}</h2>
          </div>
        </div>

  
     
          <p className="MyStoretext">
          The Shop Panel features a user-friendly interface that makes it easy for shopkeepers to create, update, and delete products without any hassle, saving them time and effort in managing their online store.
          
        </p>
        <p className="MyStoretext2">
          The inventory management feature of the Shop Panel empowers shopkeepers to stay on top of their inventory by setting alerts for low stock levels , allowing them to take proactive measures to prevent stockouts and maintain product availability.
        </p>
       


        <div className="ButtonCreate">
          <Link className="COfferButton" to="/createShopProduct">
            CREATE -  PRODUCT
          </Link>

        </div>

       
      </div>
    </div>
  );
};

export default MyStore;

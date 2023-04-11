import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getNearByShops, getShopProducts } from '../../actions/shopAction';
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Loader from "../Layout/Loader/Loader.js";

import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Doughnut, Line } from "react-chartjs-2";


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


const MyStoreProducts = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { id } = useParams();
    const [counterOn, setCounterOn] = useState(false);
    const navigate=useNavigate();
    const { orders } = useSelector((state) => state.allOrders);
    const { product } = useSelector((state) => state.product);

    const { shop, error, loading } = useSelector(
        (state) => state.getShopProduct);


    useEffect(() => {
        dispatch(getShopProducts(id));
        if(product)
        {
            alert.success("Product Deleted Succesfully")
        }
        if(error)
        {
            alert.error(error);
        }
    }, [error, dispatch,product,error]);


    let outOfStock = 0;
    //  const {products} = Shop;

    shop && 
        shop.forEach((item) => {
            if (item.Stock <= 0) {
                outOfStock += 1;
            }
        });
    const deleteProductHandler = (id) => {
        console.log("deleting shop product: " + id)
        dispatch(deleteProduct(id));
    };

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
                            <EditIcon color="black"  />
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

    shop?.forEach((item) => {
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
                data: [outOfStock, shop?.length - outOfStock],
            },
        ],
    };

  return (
      <>
          {loading ? (
              <Loader />
          ) : (
              <div className='MyStoreProductsContainer'>
                      <div className="MyProductsHeading">
                          <h1>MY PRODUCTS</h1>
                      </div>
                      <div className="SdashboardSummary">
                      
                          <div className="SBox2">
                              <ScrollTrigger
                                  className="SSrolltrigger"
                                  onEnter={() => {
                                      setCounterOn(true);
                                  }}
                                  onExit={() => {
                                      setCounterOn(false);
                                  }}
                              >
                                  <span
                                      className="span1"
                                      
                                  >
                                      {counterOn && (
                                          <CountUp
                                              start={0}
                                              end={`${shop && shop?.length}`}
                                              duration={0.5}
                                              delay={0}
                                          />
                                      )}
                                      Products
                                  </span>
                                  <span
                                      className="span1"
                                      
                                  >
                                      {counterOn && (
                                          <CountUp
                                              start={0}
                                              end={`${orders && orders.length}`}
                                              duration={0.5}
                                              delay={0}
                                          />
                                      )}
                                      Orders
                                  </span>
                              </ScrollTrigger>
                          </div>
                      </div>


                      <div className="SdoughnutChart">
                          <Doughnut data={doughnutState} />
                      </div>
                      <div className="SShopProductListDashboard">
                          <DataGrid
                              rows={rows}
                              columns={columns}
                              pageSize={10}
                              disableSelectionOnClick
                              className="SproductListTable"
                              autoHeight
                          />
                      </div>
              </div>
          )}
      </>
  )
}

export default MyStoreProducts
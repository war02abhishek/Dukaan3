import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { getNearByShops, getShopProducts } from '../../actions/shopAction';
import { useParams } from 'react-router-dom';
import ProductCard from '../Home/ProductCard';
import Loader from "../Layout/Loader/Loader.js";



const ShopProducts = () => {
    const dispatch = useDispatch();
    const alert=useAlert();
    const { id } = useParams();
     

   
    const { shop, error,loading } = useSelector(
      (state) => state.getShopProduct);


    useEffect(() => {
      dispatch(getShopProducts(id));
    }, [error, dispatch]);

  

    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="ShopProductContainer">
              <h2 className="productsHeading">Shop-Products</h2>
           <div className="ShopProducts">
              {shop && shop?.length > 0 ? (
                shop?.map((item) => <ProductCard product={item} />)
              ) : (
                <p>Try now!</p>
              )}

           </div>
            </div>
          </>
        )}
      </>
    );
}

export default ShopProducts
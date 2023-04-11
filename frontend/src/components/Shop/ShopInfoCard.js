import React, { useEffect } from "react";
import "./ShopInfoCard.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getShopProducts } from "../../actions/shopAction";


function ShopInfoCard(props) {





  return (
    <div className="shop-info-card">
      <h2 className="shop-name">{props.shopName}</h2>
      <p className="shop-address">{props.address}</p>
      <p className="shop-owner">Owner: {props.ownerName}</p>

      <p className="product-count">
        {/* {props.products.length} products available */}
        Status: available
      </p>
      <p className="shop-owner">Email: {props.email}</p>
      <Link className="Shop-Info-Button" to={`/PrimeShop/${props.shopLiscNo}`}>
        Products
      </Link>
    </div>
  );
}

export default ShopInfoCard;

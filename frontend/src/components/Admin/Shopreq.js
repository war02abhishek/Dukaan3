import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getAllShops } from '../../actions/shopAction';
import ShopreqCard from './ShopreqCard';
import './Shopreq.css'

const Shopreq = () => {
    const dispatch=useDispatch();
    const {shop}=useSelector((state)=>state.shopRequest)
    useEffect(()=>{
        console.log("dispach get all shops");
        dispatch(getAllShops());
    },[])



    return (
        <div className="dashboard-Shop">
            <h1 className="dashboard-Shop-title">Shop Requests</h1>
            <div className="shop-cards">
                {shop?.shops.map(shop => (
                    <ShopreqCard key={shop.shopName} shop={shop} />
                ))}
            </div>
        </div>
    );
}

export default Shopreq
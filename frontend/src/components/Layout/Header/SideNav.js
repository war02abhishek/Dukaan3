import React from 'react'
import "./SideNav.css";
import { Link } from "react-router-dom";
import logo from "../../../images/logoE1.jpg";
import { FaTimes } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useState } from 'react';
import DukaanLogo from "../../../Assets/DukaanLogo.png";


import { useGlobalContext } from './context';

const SideNav = () => {

  const { isSidebarOpen, closeSidebar } = useGlobalContext();//if we dont use global conetext and use simple local useState when we open side navi and go to other page sideNav will auto close as defaut useState will get applied

  return (
    <div className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <Link to="/">
          <img
            src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/black-and-yellow-logo-design-template-753d0594c51b7e8417a7a94453d69182_screen.jpg?ts=1585932268"
            // src={DukaanLogo}
            className="logo"
            alt="coding addict"
          />
        </Link>
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <ul className="links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/About">About</a>
        </li>
        <li className="Products">
          <a href="/Products">Products</a>
        </li>
        <li className="Cart">
          <a href="/Cart">Cart</a>
        </li>
        <li className="search">
          <a href="/Search">Search</a>
        </li>
        <li className="search">
          <a href="/Login">Login</a>
        </li>
        {/* <li className="search">
          <a href="/Profile">Profile</a>
        </li> */}
        <li className="search">
          <a href="/PrimeShop">Prime+</a>
        </li>
      </ul>
    </div>
  );
}

export default SideNav;
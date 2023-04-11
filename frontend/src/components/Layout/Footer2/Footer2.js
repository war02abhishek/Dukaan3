import React from "react";
import {
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaBell,
} from "react-icons/fa";
import { BsWhatsapp } from "react-icons/bs";
import "./Footer2.css";
import logo from "../../../Assets/logo.png";
import DukaanLogo from "../../../Assets/DukaanLogo.png";

// import ScrollToTop from "react-scroll-to-top";

const Footer2 = () => {
  return (
    <>
      <footer>
        <div id="ContactUs" className="FooterMainContainer">
          <div className="FooterContainer">
            {/* footer title */}
            <div className="footer1strow">
              <img src={DukaanLogo} alt="logo" />
              {/* <img
                src="https://play-lh.googleusercontent.com/gWdevkWOYg72aKfz-2CN73RbYFUX0pLyvq-arITrZnlpj-XVGy1ZNm7IfC4URhjcI1g"
                alt="logo"
              /> */}
            </div>

            <div className="footer2ndrow">
              {/*1st colmn shop catagories */}
              <div className="footer2ndrow1st">
                <div className="footer2ndrow1stContent">
                  <h2>Get to Know Us</h2>
                  <a href="/About">
                    <span>About Us</span>
                  </a>
                  <a href="#Careers">
                    <span>Careers</span>
                  </a>

                  <a href="#InternationalBrands">
                    <span>International Brands</span>
                  </a>
                  <a href="#Offers">
                    <span>Offers</span>
                  </a>
                </div>
              </div>
              {/* 2nd colmn */}
              <div className="footer2ndrow2nd">
                <h2>Make Money with Us</h2>
                <span>Register your shop online</span>
                <span>Sell on Dukaan</span>
                <span>Protect & build your brand</span>
                <span>Advertise your produt</span>
                <span>Sell under Dukaan Accelarator</span>
              </div>
              {/* 3rd colmn */}
              <div className="footer2ndrow3rd">
                <h2>Let us Help you</h2>

                <span>Payments</span>
                <span>Shipping</span>
                <span>Cancellation & Return</span>
                <span>FAQs</span>
                <span>Report Infringment</span>
              </div>

              {/* 4th colm */}
              <div className="footer2nd4thcolmn">
                <h2>Contact Us</h2>
                <div className="footer2ndrow4thcolmnAdd">
                  {/* Address */}
                  <a href="https://goo.gl/maps/Yrp33mok4ph5vLrs7">
                    <div className="StoreLocation">
                      <span>Office Location</span>
                      <span>C-1, Block C, Connaught place, Opp. PVR Plaza</span>
                      <span>New Delhi, Delhi - 110001, India</span>
                    </div>
                  </a>

                  {/* contact us */}
                  <div className="footer4thcolmnCont">
                    {/* <p>
            Email:{" "}
            <span className="font-bold text-slate-500">support@domain.com</span>
          </p> */}
                    <div className="footerPhoneNumber">
                      Email:
                      <a href="mailto:dukaan123@gmail.com">
                        <span>dukaan123@gmail.com</span>
                      </a>
                      <a href="mailto:dukkanoffical@gmail.com">
                        <span>dukkanoffical@gmail.com</span>
                      </a>
                    </div>
                    <div className="footerPhoneNumber">
                      Phone:
                      <a href="tel:+918287751494">
                        <span>+918287751494</span>
                      </a>
                      <a href="tel:+917982610896">
                        <span>+917982610896</span>
                      </a>
                    </div>
                  </div>
                  {/* social media icons */}
                  <div className="footer4thcolmnSoc">
                    <a href="https://twitter.com/wanveabhishek2">
                      <FaTwitter size="2.2vw" className="FsocialIcons" />
                    </a>
                    <a href="https://www.instagram.com/war_abhishek/">
                      <FaInstagram size="2.2vw" className="FsocialIcons" />
                    </a>
                    <a href="https://www.facebook.com/abhishek.wanve.14/">
                      <FaFacebook size="2.2vw" className="FsocialIcons" />
                    </a>
                    <a href="https://www.youtube.com/channel/UCfR-e7BP8o3tnpoW-9lbH-Q">
                      <FaYoutube size="2.2vw" className="FsocialIcons" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr width="100%" align="center" />

          <div className="FooterAlongGrow">
            Developed with ❤ by @war_abhishek
          </div>

          <div className="FooterRound1"></div>
          <div className="FooterRound2"></div>
          <div className="FooterRound3"></div>
          <div className="FooterRound4"></div>
          <div className="FooterRound5"></div>

          {/* <div className="FooterRound6"></div>
          <div className="FooterRound7"></div>
          <div className="FooterRound8"></div> */}
          {/* all rights reserved */}
          <div className="FooterCopyright">
            <span>
              {new Date().getFullYear()} @Dukaan. All rights Reserved.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer2;

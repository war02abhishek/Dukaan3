import "./ChangePass.css";

// forgot-password.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

import { forgotPassword } from "../../actions/userAction";
import Loader from "../Layout/Loader/Loader";
import { useNavigate } from "react-router-dom";

const ForgotPassword2 = () => {
  // const [email, setEmail] = useState("");
  const [formm, setFormm] = useState({
    email: "",
  });
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  const { loading, error, message } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
    }
    if (message) {
      alert.success("Email sent successfully");
    }
  }, [message, dispatch, error, loading]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formm);
    dispatch(forgotPassword(formm, navigate));
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="forgot-password-container">
          <form className="forgotForm" onSubmit={handleSubmit}>
            <input
              type="string"
              value={formm.email}
              name="email"
              onChange={(e) => setFormm({ ...formm, email: e.target.value })}
              placeholder="Email"
            />
            <button type="submit">Send Password Reset Email</button>
          </form>
        </div>
      )}
    </>
  );
};

export default ForgotPassword2;

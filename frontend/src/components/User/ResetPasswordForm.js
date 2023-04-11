import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../actions/userAction";
import { useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import './ChangePass.css'
import { useAlert } from "react-alert";
import Loader from "../Layout/Loader/Loader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { TextField, Grid, InputAdornment, IconButton } from "@material-ui/core";

const ResetPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword,setCPassword]=useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleShowCPassword = () => setShowCPassword(!showCPassword);

 
  const alert=useAlert();
  
   const { loading, error, message } = useSelector(
     (state) => state.forgotPassword
   );

  const dispatch=useDispatch();

    const { oobCode } = useParams();
    console.log("search",oobCode);
    // const searchParams = new URLSearchParams(search);
    // const oobCode = searchParams.get("oobCode");
  console.log(oobCode);

  const handleSubmit = async (event) => {
    event.preventDefault();

    dispatch(resetPassword(oobCode,password,cpassword));  
  };

  useEffect(()=>{
    if(error)
    {
      alert.error(error);
    }
    if(message)
    {
       alert.success(message);
    }
  },[error,message,dispatch])

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form className="reset-password-form" onSubmit={handleSubmit}>
          <div className="ResetPasswordConfirmPassword">
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="New Password"
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {
              <IconButton onClick={handleShowPassword}>
                {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
          </div>

          <div className="ResetPasswordConfirmPassword">
            <input
              value={cpassword}
              onChange={(event) => setCPassword(event.target.value)}
              placeholder="Confirm Password"
              type={showCPassword ? "text" : "password"}
              handleShowPassword={handleShowCPassword}
            />
            {
              <IconButton onClick={handleShowCPassword}>
                {showCPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            }
          </div>
          <button
            className="ResetPasswordConfirmPasswordButton"
            type="submit"
            disabled={loading}
          >
            Reset Password
          </button>
        </form>
      )}
    </>
  );
};

export default ResetPasswordForm;



// ResetPasswordForm.js

// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { resetPassword } from "../../actions/userAction";
// import { useLocation, useParams } from "react-router-dom";
// import "./ChangePass.css";

// const ResetPasswordForm = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [cpassword,setCPassword]=useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const dispatch=useDispatch();

//   const { oobCode } = useParams();

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     dispatch(resetPassword(oobCode,password,cpassword));  
//   };

//   return (
//     <form className="reset-password-form" onSubmit={handleSubmit}>
//       <input
//         type="password"
//         value={password}
//         onChange={(event) => setPassword(event.target.value)}
//         placeholder="New Password"
//       />
//       <input
//         type="password"
//         value={cpassword}
//         onChange={(event) => setCPassword(event.target.value)}
//         placeholder="Confirm Password"
//       />
//       <button type="submit" disabled={isLoading}>
//         Reset Password
//       </button>
//     </form>
//   );
// };

// export default ResetPasswordForm;


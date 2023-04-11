import React, { Fragment, useState, useEffect } from "react";
import "./UpdateProfile.css";

import Loader from '../Layout/Loader/Loader';
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import MetaData from "../Layout/MetaData";
import {  clearErrors, loadUser, updatePassword } from "../../actions/userAction";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstant";


import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";



const UpdatePassword = () => {

    const { user } = useSelector((state) => state.userReducer);
     const { error, isUpdated, loading } = useSelector(
       (state) => state.profileR
     );
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
     const [formm, setFormm] = useState({
       oldPassword: "",
       newPassword: "",
       confirmPassword: "",
     });

      const updatePassswordSubmit = (e) => {
        e.preventDefault();
        console.log(formm);
        // myForm.set("avatar", avatar);
        dispatch(updatePassword(formm));
      };

         
    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }

      if (isUpdated) {
        alert.success(`Password Updated Successfully`);
        navigate("/");
        dispatch(loadUser());
        dispatch({
          type: UPDATE_PROFILE_RESET,
        });
      }
    }, [dispatch, error, alert, navigate, user, isUpdated]);

    console.log(isUpdated);


  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Update Password" />
          <div className="updateProfileContainer">
            <div className="updateProfileBox">
              <h2 className="updateProfileHeading">Update Password</h2>

              <form
                className="updateProfileForm"
                encType="multipart/form-data"
                onSubmit={updatePassswordSubmit}
              >
                <div className="updateProfileName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="oldPassword"
                    required
                    name="oldPassword"
                    // value={user?.firstName}
                    // handleChange={handleChange}
                    onChange={(e) =>
                      setFormm({ ...formm, oldPassword: e.target.value })
                    }
                  />

                  <input
                    type="text"
                    placeholder="newPassword"
                    required
                    name="newPassword"
                    onChange={(e) =>
                      setFormm({ ...formm, newPassword: e.target.value })
                    }
                    // value={user?.lastName}
                    // handleChange={handleChange}
                  />
                </div>
                <div className="updateProfileEmail">
                  {/* <MailOutlineIcon /> */}
                  <input
                    type="text"
                    placeholder="confirmPassword"
                    required
                    name="confirmPassword"
                    // value={user?.email}
                    onChange={(e) =>
                      setFormm({ ...formm, confirmPassword: e.target.value })
                    }
                  />
                </div>

                <input
                  type="submit"
                  value="Update"
                  className="updateProfileBtn"
                />
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
}

export default UpdatePassword
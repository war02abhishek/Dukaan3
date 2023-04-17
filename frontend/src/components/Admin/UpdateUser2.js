import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';

import { getUserDetails, updateUser } from '../../actions/userAction';
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { MdEmail, MdDriveFileRenameOutline } from "react-icons/md";
import { FcPositiveDynamic } from "react-icons/fc";

import { Button } from "@material-ui/core";
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { UPDATE_USER_RESET } from '../../constants/userConstant';

const UpdateUser2 = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const { id } = useParams();

    const initialState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
        role: ""
    };
    const [formdata, setFormdata] = useState(initialState);
    const [showPassword, setShowPassword] = useState(false);
    const handleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formdata);
        console.log(id);
        dispatch(updateUser(id, formdata));

    };
    const { loading, error, user } = useSelector((state) => state.userDetail);

    const {
        loading: updateLoading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.profileR);

    console.log(id);

    useEffect(() => {
        // if(!user)
        // {
        dispatch(getUserDetails(id));
        formdata.firstName = user.firstName;
        formdata.lastName = user.lastName;
        formdata.email = user.email;
        formdata.role = user.role;

        // }
        if (isUpdated) {
            alert.success("User Updated Successfully");
             navigate("/admin/users");
             dispatch({type:UPDATE_USER_RESET});
        }

    }, [alert, isUpdated, navigate, dispatch])




    return (
        <>
            <div className="newProductContainer">
                <form
                    className="createProductForm"
                    encType="multipart/form-data"
                    onSubmit={handleSubmit}
                >
                    <h1>Update User</h1>

                    <div>
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            name="firstName"
                            placeholder="firstName"
                            value={formdata.firstName}
                            required
                            // handleChange={handleChange}
                            onChange={(e) =>
                                setFormdata({ ...formdata, firstName: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <MdDriveFileRenameOutline />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="lastName"
                            value={formdata.lastName}
                            required
                            // handleChange={handleChange}
                            onChange={(e) =>
                                setFormdata({ ...formdata, lastName: e.target.value })
                            }
                        />
                    </div>
                    <div>
                        <MdEmail />
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            value={formdata.email}

                            required
                            onChange={(e) =>
                                setFormdata({ ...formdata, email: e.target.value })
                            }
                        // value={price}
                        // onChange={(e) => setPrice(e.target.value)}
                        // handleChange={handleChange}
                        />
                    </div>




                    <div>
                        <FcPositiveDynamic color='#f1f1f1' />
                        <input
                            type="text"
                            name="role"
                            placeholder="role"
                            value={formdata.role}

                            required
                            onChange={(e) =>
                                setFormdata({ ...formdata, role: e.target.value })
                            }
                        />
                    </div>


                    <Button
                        id="createProductBtn"
                        type="submit"
                        disabled={loading ? true : false}
                    >
                        Update
                    </Button>
                </form>
            </div>
        </>
    );
}

export default UpdateUser2
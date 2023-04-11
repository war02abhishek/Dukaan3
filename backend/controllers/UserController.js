import express from "express";
import mongoose from "mongoose";
const router = express.Router();
import User from "../models/userModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
// import catchAsyncError from "../middleware/catchAsyncError.js";
import ApiFeatures from "../routes/apiFeatures.js";
import sendToken from "../utils/jwtToken.js";
import sendEmail from "../utils/sendEmail.js";
import admin from "firebase-admin";
import crypto from "crypto";
// import { useFirebase } from "../../frontend/src/firebase.js";

admin.initializeApp();
//  const firebase = useFirebase();

//REGISTER USER
export const registerUser = async (req, res, next) => {
  try {
    // const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
    //   folder: "avatars",
    //   width:150,
    //   crop:"scale",
    // });

    const { firstName, lastName, email, password, avatar } = req.body;
    console.log(req.body);
    const user = await User.create({
      firstName,
      lastName,
      email,
      password,
      avatar,
      // avatar: {
      //   // public_id: myCloud.public_id,
      //   // url: myCloud.secure.url,
      //   public_id: "sampleImage",
      //   url: "sampleUrl",
      // },
    }); //requesting database to create

    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const googleloginUser = async (req, res, next) => {
  try {
    // const myCloud= await cloudinary.v2.uploader.upload(req.body.avatar,{
    //   folder: "avatars",
    //   width:150,
    //   crop:"scale",
    // });
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      const { firstName, lastName, avatar } = req.body;
      console.log(req.body);
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        avatar,
      });
      //requesting database to create
    }

    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//LOGIN USER
export const loginUser = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide email and password", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(
        new ErrorHandler("User Doesnt exist Invalid Credentials", 401)
      );
    }
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(
        new ErrorHandler("password not matched Invalid Credentials", 401)
      );
    }
    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//LOG OUT
export const logoutUser = async (req, res, next) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()), //abhi ke abhi expire hojao
      httpOnly: true,
    });

    res.status(200).json({
      sucess: true,
      message: "LOG OUT",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//FORGOT PASSWORD
export const forgotPassword = async (req, res, next) => {
  try {
    console.log(req.body);
    const { email } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return next(new ErrorHandler("user not found", 404));
    }

    //get reset password token from userschema
    console.log("user ", user);
    const resetToken = user.getResetPasswordToken();
    console.log(resetToken);
    console.log("ji");
    // console.log(typeof resetToken);

    // await user.save({ validateBeforeSave: false });
    // await user.updateOne(
    //   { _id: user._id },
    //   { $set: { resetPasswordToken: resetToken } }
    // );
    console.log("user ", user);
    await user.save();

    // await user.save({ validateBeforeSave: false }); //reset token to mil gaya tha bt vo save nahi huva tha
    console.log(resetToken);

    console.log("hn ji");

    // const resetPasswordUrl = `${req.protocol}://${req.get(
    //   "host"
    // )}/api/v1/password/reset/${resetToken}`;
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/password/reset/${resetToken}`;

    console.log(resetPasswordUrl);
    const message = `Your Password reset link is :- \n\n ${resetPasswordUrl}  \n\n If you have not requested this email then, please ignore it`;
    console.log(message);

    // const actionCodeSettings = {
    //   url: `http://localhost:3000/reset/password?oobCode=${resetPasswordUrl}`,
    //   handleCodeInApp: true,
    // }

    try {
      await sendEmail({
        email: user.email,
        subject: `Ecommerce DUKAAN Password recovery`,
        message,
      });
      // await admin
      //   .auth()
      //   .sendPasswordResetEmail(req.body, actionCodeSettings);

      res.status(200).json({
        message: `Email send to ${user.email} Sucessfully`,
      });
    } catch (error) {
      console.log(error);
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { oobCode, newPassword, cpassword } = req.body;

    // Step 1: Verify the password reset code
    console.log("reset password", req.body);
    console.log("reset oobCode ", req.params.oobCode);
    console.log(typeof req.params.oobCode);

    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.oobCode)
      .digest("hex");

    console.log("resetToken", resetPasswordToken);
    console.log(typeof resetPasswordToken);

    const user = await User.findOne({
      resetPasswordToken: resetPasswordToken,
      // resetPasswordExpire: { $gt: Date.now() },
    });
    console.log("user found : ", user);

    if (!user) {
      return next(
        new ErrorHandler(
          "Reset Password Token is invalid or has been expired",
          400
        )
      );
    }

    if (newPassword !== cpassword) {
      return next(new ErrorHandler("Password does not password", 400));
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

    res.status(200).send("Password reset successful");
  } catch (error) {
    {
      res.status(404).json({ message: error });
    }
  }
};

// Get User Details
export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    {
      res.status(404).json({ message: error });
    }
  }
};

//UPDATE PROFILE
export const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
    };
    console.log(newUserData);
    // We will add cloudinary image upload later
    // if (req.body.avatar !== "") {
    //   const user = await User.findById(req.user.id);
    //   const imageId = user.avatar.public_id;
    //   await cloudinary.v2.uploader.destroy(imageId);
    //   const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //     folder: "avatars",
    //     width: 150,
    //     crop: "scale",
    //   });

    //   newUserData.avatar = {
    //     public_id: myCloud.public_id,
    //     url: myCloud.secure_url,
    //   };
    // }

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
  }
};

//UDATE USER PASSWORD
export const updatePassword = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user.id).select("+password");
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Old Password is Incorrect", 400));
    }

    if (!req.body.newPassword || !req.body.confirmPassword) {
      return next(
        new ErrorHandler(
          "Please provide New Password and Confirm Password",
          400
        )
      );
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
      return next(new ErrorHandler("Passwords do not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();
    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//GET ALL USER --BY ADMIN
export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();

    if (!users) {
      return next(new ErrorHandler("No users found", 404));
    }

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Get single user details for admin
export const getSingleUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorHandler("No user found with this id", 404));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Update roles of user by admin
export const updateUserRole = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    if (!user) {
      return next(new ErrorHandler("No user found with this id", 400));
    }

    res.status(200).json({
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Delete User -- Admin
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(
        new ErrorHandler(`No user found with this id: ${req.params.id}`, 400)
      );
    }

    // We will remove cloudinary image upload later
    // const imageId = user.avatar.public_id;
    // await cloudinary.v2.uploader.destroy(imageId);

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

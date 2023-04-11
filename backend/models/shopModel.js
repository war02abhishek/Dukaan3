import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const shopSchema = new mongoose.Schema({
  shopLiscNo: {
    type: Number,
    unique: true,
    required: [true, "Shop ID is required"],
  },
  shopName: {
    type: String,
    required: [true, "ShopName is required"],
    maxLength: [30, "ShopName must be less than 30 characters"],
    minLength: [3, "ShopName must be at least 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Invalid email format"],
  },
  ownerName: {
    type: String,
    required: [true, "Name is required"],
    maxLength: [30, "Name must be less than 30 characters"],
    minLength: [3, "Name must be at least 3 characters"],
  },
  address: {
    type: String,
    required: [true, "Location is required"],
    maxLength: [30, "Location must be less than 50 characters"],
    minLength: [3, "Location must be at least 3 characters"],
  },
  location: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  products: [
    {
      shopLiscNo: {
        type: Number,
        required: [true, "Shop ID is required"],
      },
      name: {
        type: String,
        required: [true, "Product Name is required"],
        trim: true,
      },
      description: {
        type: String,
        required: [true, "Please Enter Product Description"],
      },
      price: {
        type: Number,
        required: [true, "please enter product price"],
        maxLength: [8, "Price cannot excedd 8 char"],
      },
      ratings: {
        type: Number,
        default: 0,
      },
      image: [
        {
          public_id: {
            type: String,
            required: true,
          },
          url: {
            type: String,
            required: true,
          },
        },
      ],
      category: {
        type: String,
        required: [true, "Please Enter Product Category"],
      },
      Stock: {
        type: Number,
        required: [true, "Please Enter Product Stock"],
        maxLength: [4, "Stock cannot excedd 4 characters"],
        default: 1,
      },
      numOfReviews: {
        type: Number,
        default: 0,
      },
      reviews: [
        {
          user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
          },
          name: {
            type: String,
            required: true,
          },
          rating: {
            type: Number,
            required: true,
          },
          comment: {
            type: String,
            required: true,
          },
        },
      ],
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

var ProdD = mongoose.model("Shop", shopSchema);

export default ProdD;

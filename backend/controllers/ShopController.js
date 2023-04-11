import Shop from "../models/shopModel.js";
import Product from "../models/productModel.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import express from "express";
import mongoose from "mongoose";
const router = express.Router();

export const CreateShop = async (req, res, next) => {
  try {
    console.log(req.body);
    const shop = await Shop.create(req.body);
    res.status(201).json({
      sucess: true,
      shop,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const CreateShopProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const { shopLiscNo } = req.body;
    console.log(shopLiscNo);
    const shop = await Shop.findOne({ shopLiscNo }); //if u have to find by any attribute in scema then use findOne else use FindByID if by objectID
  
    console.log(shop);

    if (!shop) {
      return next(new ErrorHandler("Shop not found", 404));
    }
    shop.products.push(req.body);
    await shop.save();

    res.status(201).json({
      sucess: true,
      shop,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const GetShopDetail = async (req, res, next) => {
  try {
    // console.log(req.body);
    console.log(req.user);
    const { email } = req.user;
     
    const shop = await Shop.findOne({ email }); //if u have to find by any attribute in scema then use findOne else use FindByID if by objectID
    console.log(shop);

    res.status(201).json({
      sucess: true,
      shop,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const getNearByShops = async (req, res, next) => {
  try {
    console.log(req.body);
    const { latitude, longitude } = req.body;
    const userLocation = {
      type: "Point",
      coordinates: [parseFloat(longitude), parseFloat(latitude)],
    };
    // const nearbyShops = await Shop.aggregate([
    //   {
    //     $geoNear: {
    //       near: userLocation,
    //       distanceField: 'distance',
    //       spherical: true,
    //     },
    //   },
    //   {
    //     $project: {
    //       name: 1,
    //       location: 1,
    //       distance: { $round: ['$distance', 2] },
    //       products: 1,
    //     },
    //   },
    //   {
    //     $sort: { distance: 1 },
    //   }]);
    const nearbyShops = await Shop.find({
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(latitude), parseFloat(longitude)],
          },
          $minDistance: 1,//min 1m
          $maxDistance: 5000,//max 5km
        },
      },
    });

    res.status(201).json({
      sucess: true,
      nearbyShops,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const Cart = require("../../../models/Cart");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");

const countSavedProducts = asyncHandler(async (req, res) => {
    try {
      const count = await Cart.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors du comptage des produits enregistrés.",
      });
    }
  });

  const listSavedProductsWithCount = asyncHandler(async (req, res) => {
    try {
      const savedProducts = await Cart.aggregate([
        {
          $group: {
            _id: "$idProduct",
            count: { $sum: 1 },
          },
        },
        {
          $lookup: {
            from: "products", // Remplacez "products" par le nom de votre collection de produits
            localField: "_id",
            foreignField: "_id",
            as: "productDetails",
          },
        },
        {
          $unwind: "$productDetails",
        },
        {
          $project: {
            _id: 0,
            idProduct: "$_id",
            name: "$productDetails.name",
            reference: "$productDetails.reference",
            ingredients: "$productDetails.ingredients",
            description: "$productDetails.description",
            image: "$productDetails.image",
            category: "$productDetails.category",
            country: "$productDetails.country",
            label: "$productDetails.label",
            count: 1,
          },
        },
      ]);
  
      res.status(200).json(savedProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors de la récupération des produits enregistrés avec le nombre d'occurrences.",
      });
    }
  });

  const countEpicerie = asyncHandler(async (req, res) => {
    try {
      const count = await Epicerie.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors du comptage des épiceries.",
      });
    }
  });

  const countUser = asyncHandler(async (req, res) => {
    try {
      const count = await User.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors du comptage des utilisateurs.",
      });
    }
  });

  const countProduct = asyncHandler(async (req, res) => {
    try {
      const count = await Product.countDocuments();
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: "Erreur lors du comptage des produits.",
      });
    }
  });
  
  module.exports = {
    countSavedProducts,
    listSavedProductsWithCount,
    countEpicerie,
    countProduct,
    countUser
  };
  
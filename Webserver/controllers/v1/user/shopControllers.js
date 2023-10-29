const Product = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");

//Lister les produits des épiceries
const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});


//Chercher un produit à travers son :nom ou son :référence
const getProductByName = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  });


//Lister les épiceries vendant un :produit
const getGroceryByProduct = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

//Trouver l'épicerie la plus proche à travers la :distance du client et de l'épicerie et le :produit recherché
const getGroceryByProductByPostion = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  });

module.exports = {
  getGroceryProducts,
  getGroceryByProduct,
  getProductByName,
  getGroceryByProductByPostion
};

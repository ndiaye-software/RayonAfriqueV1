const Cart = require("../../../models/Cart");
const User = require("../../../models/User");
const asyncHandler = require("express-async-handler");

//Enregistrer un produit
const saveProduct = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

//Chercher les produits enregistrés d'un :utilisateur
const getSavedProducts = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  });


module.exports = {
  saveProduct,
  getSavedProducts
};

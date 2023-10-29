const Product = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");

//Chercher une épicerie à travers son :nom
const getGroceryByName = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

//Chercher une épicerie à travers la :position de l'utilisateur
const getGroceryByPosition = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  });

//Lister les produits de l'épicerie à travers son :nom
const getProductByGrocery = asyncHandler(async (req, res) => {
  try {
  } catch (error) {}
});

//Afficher la description de l'épicerie à travers son :nom
const getProfileByGrocery = asyncHandler(async (req, res) => {
    try {
    } catch (error) {}
  });

module.exports = {
  getGroceryByName,
  getProductByGrocery,
  getGroceryByPosition,
  getProfileByGrocery
};

const Product = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const geolib = require('geolib');
const asyncHandler = require("express-async-handler");

//Lister les produits des épiceries
const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
    const groceryProducts = await Product.find({ available: true })
      .populate("idEpicerie")
      .populate("category")
      .populate("country");

    res.status(200).json(groceryProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

//Chercher un produit à travers son :nom ou son :référence
const getProductByName = asyncHandler(async (req, res) => {
  try {
    const { searchTerm } = req.params;

    // Recherchez le produit par nom ou référence (utilisez des expressions régulières pour une recherche insensible à la casse)
    const products = await EpicerieProduct.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } }, // Recherche par nom (insensible à la casse)
        { reference: { $regex: searchTerm, $options: "i" } }, // Recherche par référence (insensible à la casse)
      ],
    })
      .populate("idEpicerie")
      .populate("category")
      .populate("country");

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche du produit." });
  }
});

//Lister les épiceries vendant un :produit
const getGroceryByProduct = asyncHandler(async (req, res) => {
  try {
    const { productId } = req.params; // Supposons que le paramètre d'URL contient l'ID du produit que vous cherchez

    // Recherchez l'épicerie où le produit est disponible
    const groceries = await Product.find({
      idEpicerie: productId, // ID du produit
      available: true, // Vérifiez si le produit est disponible
    })
      .populate("idEpicerie", "name image description phone")
      .populate("category")
      .populate("country");

    res.status(200).json(groceries);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la recherche des épiceries." });
  }
});
//Trouver l'épicerie la plus proche à travers la :distance du client et de l'épicerie et le :produit recherché

const getGroceryByProductByPosition = asyncHandler(async (req, res) => {
  try {
    const { latitude, longitude, productId } = req.body;

    const allGroceries = await Epicerie.find({});

    const groceriesWithDistances = allGroceries.map((grocery) => {
      const distance = geolib.getDistance(
        { latitude, longitude },
        { latitude: grocery.latitude, longitude: grocery.longitude }
      );
      return { ...grocery.toObject(), distance };
    });

    groceriesWithDistances.sort((a, b) => a.distance - b.distance);

    res.status(200).json(groceriesWithDistances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Erreur lors de la recherche des épiceries les plus proches.' });
  }
});


module.exports = {
  getGroceryProducts,
  getGroceryByProduct,
  getProductByName,
  getGroceryByProductByPosition,
};

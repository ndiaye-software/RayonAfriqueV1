const Product = require("../../../models/Product");
const Epicerie = require("../../../models/Epicerie");
const Label = require("../../../models/Label");
const Category = require("../../../models/Category");
const Country = require("../../../models/Country");
const geolib = require('geolib');
const asyncHandler = require("express-async-handler");

//Lister les produits des épiceries
const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
    const groceryProducts = await Product.find({ available: true }, 'name image description price ingredients')
      .populate({
        path: 'country',
        select: 'countryName',
        options: { lean: true }
      }) 
      .populate({
        path: 'category',
        select: 'categoryName',
        options: { lean: true }
      }) 
      .populate({
        path: 'label',
        select: 'labelName',
        options: { lean: true }
      })
      .lean();

    const formattedProducts = groceryProducts.map(product => ({
      id: product._id,
      name: product.name,
      price: product.price,
      ingredients: product.ingredients,
      description: product.description,
      image: product.image,
      categoryName: product.category ? product.category.categoryName : null,
      countryName: product.country ? product.country.countryName : null,
      labelName: product.label ? product.label.labelName : null,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

//Chercher un produit à travers son :nom ou son :référence, catgeory, country, label
const searchProduct = asyncHandler(async (req, res) => {
  try {
    const { name } = req.body;

    // Recherchez le produit par nom, référence, label, country ou category
    const products = await Product.find({
      $or: [
        { name: { $regex: name, $options: "i" } }, // Recherche par nom (insensible à la casse)
        { reference: { $regex: name, $options: "i" } }, // Recherche par référence (insensible à la casse)
        { 'label.labelName': { $regex: name, $options: "i" } }, // Recherche par label (insensible à la casse)
        { 'country.countryName': { $regex: name, $options: "i" } }, // Recherche par country (insensible à la casse)
        { 'category.categoryName': { $regex: name, $options: "i" } }, // Recherche par category (insensible à la casse)
      ],
    })
      .populate("category")
      .populate("country")
      .populate("label")
      .lean();

    if (products.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    const formattedProducts = products.map(product => ({
      _id: product._id,
      name: product.name,
      reference: product.reference,
      categoryName: product.category ? product.category.categoryName : null,
      countryName: product.country ? product.country.countryName : null,
      labelName: product.label ? product.label.labelName : null,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche du produit." });
  }
});



//Lister les épiceries vendant un :produit
const getGroceryByProduct = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params; // Supposons que le paramètre d'URL contient le nom du produit que vous cherchez

    // Recherchez le produit par nom pour obtenir son ID
    const product = await Product.findOne({
      name: name,
    });

    if (!product) {
      return res.status(404).json({ error: "Produit non disponible." });
    }

    // Recherchez l'épicerie où le produit est disponible en utilisant l'ID du produit
    const groceries = await Product.find({
      idEpicerie: product.idEpicerie, // ID du produit
      available: true, // Vérifiez si le produit est disponible
    })
      .populate("idEpicerie", "name image description phone")
      .populate("category")
      .populate("country");

    res.status(200).json(groceries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche des épiceries." });
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
  searchProduct,
  getGroceryByProductByPosition,
};

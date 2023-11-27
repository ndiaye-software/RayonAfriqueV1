const Product = require("../../../models/Product");
const Epicerie = require("../../../models/Epicerie");
const Label = require("../../../models/Label");
const Category = require("../../../models/Category");
const Country = require("../../../models/Country");
const EpicerieProduct = require("../../../models/EpicerieProduct");
const geolib = require("geolib");
const asyncHandler = require("express-async-handler");

//Lister les produits des épiceries
const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
    const groceryProducts = await EpicerieProduct.find({ available: true }) // Ajoutez la condition ici
      .populate({
        path: "idProduct",
        select: "name image description price ingredients available", // Sélectionnez les champs que vous souhaitez
      })
      .populate({
        path: "idProduct.country",
        select: "countryName",
        options: { lean: true },
      })
      .populate({
        path: "idProduct.category",
        select: "categoryName",
        options: { lean: true },
      })
      .populate({
        path: "idProduct.label",
        select: "labelName",
        options: { lean: true },
      })
      .populate({
        path: "idEpicerie",
        select: "name image description phone",
        options: { lean: true },
      })
      .lean();

    const formattedProducts = groceryProducts.map((product) => ({
      id: product.idProduct._id,
      name: product.idProduct.name,
      price: product.price,
      ingredients: product.idProduct.ingredients,
      description: product.idProduct.description,
      image: product.idProduct.image,
      available: product.available,
      categoryName: product.idProduct.category
        ? product.idProduct.category.categoryName
        : null,
      countryName: product.idProduct.country
        ? product.idProduct.country.countryName
        : null,
      labelName: product.idProduct.label
        ? product.idProduct.label.labelName
        : null,
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

    const category = await Category.findOne({ categoryName: name });
    const label = await Label.findOne({ labelName: name });
    const country = await Country.findOne({ countryName: name });

    const categoryId = category ? category._id : null;
    const labelId = label ? label._id : null;
    const countryId = country ? country._id : null;

    // Recherchez le produit par nom, référence, label, country ou category
    const products = await Product.find({
      $or: [
        { name: { $regex: name, $options: "i" } }, // Recherche par nom (insensible à la casse)
        { reference: { $regex: name, $options: "i" } }, // Recherche par référence (insensible à la casse)
        { label: labelId }, // Utilisez l'ID de label pour la recherche
        { country: countryId }, // Utilisez l'ID de country pour la recherche
        { category: categoryId }, // Utilisez l'ID de category pour la recherche
      ],
    })
      .populate("category")
      .populate("country")
      .populate("label")
      .lean();

    if (products.length === 0) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    const formattedProducts = products.map((product) => ({
      _id: product._id,
      name: product.name,
      reference: product.reference,
      image: product.image,
      description: product.description,
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
    const { name } = req.params;

    const product = await Product.findOne({
      name: name,
    });

    if (!product) {
      return res.status(404).json({ error: "Produit non disponible." });
    }

    const groceries = await EpicerieProduct.find({
      idProduct: product._id,
      available: true,
    })
      .populate({
        path: "idEpicerie",
        select: "name image description phone",
      })
      .exec();

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
    res
      .status(500)
      .json({
        error: "Erreur lors de la recherche des épiceries les plus proches.",
      });
  }
});

module.exports = {
  getGroceryProducts,
  getGroceryByProduct,
  searchProduct,
  getGroceryByProductByPosition,
};

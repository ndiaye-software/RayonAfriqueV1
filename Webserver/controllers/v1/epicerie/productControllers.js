const Product = require("../../../models/Product");
const Label = require("../../../models/Label");
const Category = require("../../../models/Category");
const Country = require("../../../models/Country");
const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const postImage = asyncHandler(async (req, res) => {
  try {
    const imageName = req.file.filename;
    await Images.create({ image: imageName });
    res.json({ status: "ok" });
  } catch (error) {
    res.json({ status: error });
  }
});

const getImage = async (req, res) => {
  try {
    const data = await Images.find({});
    res.send({ status: "ok", data: data });
  } catch (error) {
    res.json({ status: error });
  }
};

const createProduct = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const epicerie = await Epicerie.findById(userId);

  if (!epicerie) {
    return res.status(404).json({ error: "Epicerie non trouvé." });
  }

  const imageName = req.file.filename;

  console.log(imageName);

  const {
    name,
    reference,
    ingredients,
    description,
    category: categoryName,
    country: countryName,
    label: labelName,
  } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("nom produit");
  if (!categoryName) missingFields.push("catégorie du produit");
  if (!countryName) missingFields.push("pays du produit");
  if (!imageName) missingFields.push("image");
  if (!labelName) missingFields.push("marque du produit");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Les champs suivants sont requis: ${missingFields.join(", ")}`,
    });
  }

  try {
    // Recherche des catégories, labels et pays dans la base de données
    const [category, label, country] = await Promise.all([
      Category.findOne({ categoryName }),
      Label.findOne({ labelName }),
      Country.findOne({ countryName }),
    ]);

    if (!category) {
      return res
        .status(404)
        .json({ error: `La catégorie '${categoryName}' n'existe pas.` });
    }
    if (!label) {
      return res
        .status(404)
        .json({ error: `Le label '${labelName}' n'existe pas.` });
    }

    if (!country) {
      return res
        .status(404)
        .json({ error: `Le pays '${countryName}' n'existe pas.` });
    }

    let existingProduct = await Product.findOne({
      name,
      reference,
      ingredients,
      description,
      category: category._id,
      country: country._id,
      label: label._id,
    });

    if (existingProduct) {
      return res.status(400).json({ message: "Le produit existe déjà." });
    }

    console.log({
      name,
      reference,
      ingredients,
      description,
      image: imageName,
      category: category._id,
      country: country._id,
      label: label._id,
    });
    const product = new Product({
      name,
      reference,
      ingredients,
      description,
      image: imageName,
      category: category._id,
      country: country._id,
      label: label._id,
    });

    const savedProduct = await product.save();
    
    res.status(201).json({id: savedProduct._id});
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      res.status(400).json({ message: "Ce produit existe déjà." });
    } else {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création du produit" });
    }
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decodedToken.UserInfo.id;
    const epicerie = await Epicerie.findById(userId);
    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    // Recherche des produits de l'épicerie spécifiée par idEpicerie
    const product = await Product.find()
      .populate("category")
      .populate("country")
      .populate("label")
      .lean();

    if (!Product) {
      return res.status(404).json({ message: "Aucun produit trouvé" });
    }

    const formattedProduct = product.map((product) => ({
      _id: product._id,
      name: product.name,
      reference: product.reference,
      image: product.image,
      description: product.description,
      categoryName: product.category ? product.category.categoryName : null,
      countryName: product.country ? product.country.countryName : null,
      labelName: product.label ? product.label.labelName : null,
    }));

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decodedToken.UserInfo.id;
    const epicerie = await Epicerie.findById(userId);
    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    const { idProduct } = req.params; // Récupérez l'ID du produit à partir des paramètres de l'URL

    // Recherchez le produit par son ID
    const product = await Product.findById(idProduct)
      .populate("category")
      .populate("country")
      .populate("label")
      .lean(); // Utilisez lean() pour obtenir un objet JavaScript au lieu d'un objet Mongoose

    if (!product) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé avec cet ID." });
    }

    // Formatez les champs country, category et label de la même manière que dans les exemples précédents
    const formattedProduct = {
      _id: product._id,
      name: product.name,
      reference: product.reference,
      image: product.image,
      description: product.description,
      categoryName: product.category ? product.category.categoryName : null,
      countryName: product.country ? product.country.countryName : null,
      labelName: product.label ? product.label.labelName : null,
    };

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération du produit." });
  }
});

module.exports = {
  createProduct,
  getProduct,
  getProductById,
  postImage,
  getImage,
};

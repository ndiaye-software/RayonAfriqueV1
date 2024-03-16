const Product = require("../../../models/Product");
const Label = require("../../../models/Label");
const Category = require("../../../models/Category");
const Country = require("../../../models/Country");
const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

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
    return res.status(404).json({ message: "Epicerie non trouvée." });
  }

  if (!req.file) {
    return res.status(404).json({ message: "Mettez une image." });
  }

  const imageName = req.file.filename;

  const {
    name,
    reference,
    ingredients,
    description,
    category: categoryName,
    country: countryName,
    label: labelName,
    autreCategory,
    autreCountry,
    autreLabel
  } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("nom produit");
  if (!categoryName && !autreCategory) missingFields.push("catégorie du produit");
  if (!countryName && !autreCountry) missingFields.push("pays du produit");
  if (!labelName && !autreLabel) missingFields.push("marque du produit");
  if (!imageName || !req.file || !req.file.filename) missingFields.push("image");


  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Les champs suivants sont requis: ${missingFields.join(", ")}`,
    });
  }

  try {
    // Recherche des catégories, labels et pays dans la base de données
    let [category, label, country] = await Promise.all([
      Category.findOne({ categoryName }),
      Label.findOne({ labelName }),
      Country.findOne({ countryName }),
    ]);

    // Create new category if not found
    if (!category && autreCategory) {
      const existingCategory = await Category.findOne({ categoryName: autreCategory });
      if (existingCategory) {
        return res.status(409).json({ message: `La catégorie '${autreCategory}' existe déjà. Sélectionnez-le !` });
      }
      category = new Category({ categoryName: autreCategory });
      category = await category.save();
    } else if (!category) {
      return res
        .status(404)
        .json({ message: `La catégorie '${categoryName}' n'existe pas.` });
    }

    // Create new label if not found
    if (!label && autreLabel) {
      const existingLabel = await Label.findOne({ labelName: autreLabel });
      if (existingLabel) {
        return res.status(409).json({ message: `La marque '${autreLabel}' existe déjà. Sélectionnez-le !` });
      }
      label = new Label({ labelName: autreLabel });
      label = await label.save();
    } else if (!label) {
      return res
        .status(404)
        .json({ message: `Le label '${labelName}' n'existe pas.` });
    }

    // Create new country if not found
    if (!country && autreCountry) {
      const existingCountry = await Country.findOne({ countryName: autreCountry });
      if (existingCountry) {
        return res.status(409).json({ message: `La pays '${autreCountry}' existe déjà. Sélectionnez-le !` });
      }
      country = new Country({ countryName: autreCountry });
      country = await country.save();
    } else if (!country) {
      return res
        .status(404)
        .json({ message: `Le pays '${countryName}' n'existe pas.` });
    }

    if (!category) {
      return res
        .status(404)
        .json({ message: `La catégorie '${categoryName}' n'existe pas.` });
    }
    if (!label) {
      return res
        .status(404)
        .json({ message: `Le label '${labelName}' n'existe pas.` });
    }

    if (!country) {
      return res
        .status(404)
        .json({ message: `Le pays '${countryName}' n'existe pas.` });
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

    res.status(201).json({ id: savedProduct._id });
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
};

const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");

const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    reference,
    ingredients,
    description,
    image,
    category,
    country,
    label,
  } = req.body;

  if (!name || !category || !country || !image || !label) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Vérifier si le produit existe déjà en utilisant tous les champs
    let existingProduct = await Product.findOne({
      name,
      reference,
      ingredients,
      description,
      image,
      category,
      country,
      label,
    });

    if (existingProduct) {
      // Si le produit existe déjà, renvoyer un message approprié
      return res.status(400).json({ message: "Le produit existe déjà." });
    }

    // Si le produit n'existe pas, le créer
    const product = new Product({
      name,
      reference,
      ingredients,
      description,
      image,
      category,
      country,
      label,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
});

const getProduct = asyncHandler(async (req, res) => {
  try {
    // Recherche des produits de l'épicerie spécifiée par idEpicerie
    const product = await Product.find()
      .populate("category")
      .populate("country")
      .populate("label")
      .lean();

    if (!Product) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    const formattedProduct = product.map(product => ({
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
          { 'label': labelId }, // Utilisez l'ID de label pour la recherche
          { 'country': countryId }, // Utilisez l'ID de country pour la recherche
          { 'category': categoryId }, // Utilisez l'ID de category pour la recherche
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

const getProductById = asyncHandler(async (req, res) => {
  try {
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
  searchProduct
};

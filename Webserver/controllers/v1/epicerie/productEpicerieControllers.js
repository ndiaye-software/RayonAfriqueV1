const EpicerieProduct = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const createEpicerieProduct = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    // Decode the accessToken to extract user ID
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // Verify and decode the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Access the user ID from the decoded token
    const userId = decodedToken.UserInfo.id;

    // Retrieve the user's epicerie by user ID
    const epicerie = await Epicerie.findById(userId).select('-password');

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    const { idProduct, price, available } = req.body;

    const missingFields = [];
    if (!userId) missingFields.push("userId");
    if (!idProduct) missingFields.push("idProduct");
    if (!price) missingFields.push("prix");
    if (!available) missingFields.push("disponibilité");

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Les champs suivants sont requis: ${missingFields.join(", ")}`,
      });
    }

    const existingProduct = await EpicerieProduct.findOne({
      idEpicerie: userId,
      idProduct: idProduct,
    });

    if (existingProduct) {
      return res
        .status(409)
        .json({ message: "Ce produit existe déjà dans votre épicerie." });
    }

    const epicerieProduct = new EpicerieProduct({
      idEpicerie: userId,
      idProduct,
      price,
      available,
    });

    await epicerieProduct.save();
    res.status(201).json(epicerieProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
});

const getEpicerieProductByIdEpicerie = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    // Decode the accessToken to extract user ID
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // Verify and decode the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Access the user ID from the decoded token
    const userId = decodedToken.UserInfo.id;

    // Retrieve the user's epicerie by user ID
    const epicerie = await Epicerie.findById(userId).select('-password');

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    if (epicerie.status == "inactif") {
      console.log("Validez votre compte")
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    // Retrieve epicerie products using the user ID
    const epicerieProduct = await EpicerieProduct.find({
      idEpicerie: userId,
    })
      .populate({
        path: "idProduct",
        populate: {
          path: "category country label",
          select: "categoryName countryName labelName",
        },
        select: "name category label country description image reference",
      })
      .lean();

    if (!epicerieProduct || epicerieProduct.length === 0) {
      return res.json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    // Format and send the response
    const formattedProducts = epicerieProduct.map((epicerieProduct) => ({
      idEpicerieProduct: epicerieProduct._id,
      idProduct: epicerieProduct.idProduct._id,
      name: epicerieProduct.idProduct.name,
      reference: epicerieProduct.idProduct.reference,
      description: epicerieProduct.idProduct.description,
      image: epicerieProduct.idProduct.image,
      category: epicerieProduct.idProduct.category
        ? epicerieProduct.idProduct.category.categoryName
        : null,
      country: epicerieProduct.idProduct.country
        ? epicerieProduct.idProduct.country.countryName
        : null,
      label: epicerieProduct.idProduct.label
        ? epicerieProduct.idProduct.label.labelName
        : null,
      price: epicerieProduct.price,
      available: epicerieProduct.available,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

const getProductDetailsByIdProduct = asyncHandler(async (req, res) => {
  try {
    // Check if authorization header is missing
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    // Decode the accessToken to extract user ID
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // Verify and decode the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Access the user ID from the decoded token
    const idEpicerie = decodedToken.UserInfo.id;

    // Retrieve the user's epicerie by user ID
    const epicerie = await Epicerie.findById(idEpicerie).select('-password');

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    // Check if the epicerie exists for the user
    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie not found." });
    }

    // Extract the product ID from the request parameters
    const { idEpicerieProduct } = req.params;

    // Retrieve the epicerie product details using the product ID
    const epicerieProduct = await EpicerieProduct.find({
      _id: idEpicerieProduct,
    })
      .populate({
        path: "idProduct",
        populate: {
          path: "category country label",
          select: "categoryName countryName labelName",
        },
        select: "name category label country description image reference",
      })
      .lean();

    // Check if the product exists
    if (!epicerieProduct) {
      return res.status(404).json({ error: "Product not found." });
    }


    // Check if the product belongs to the user's epicerie
    if (epicerieProduct[0].idEpicerie.toString() !== idEpicerie) {
      return res.status(403).json({ error: "Unauthorized access to product." });
    }


    const formattedProduct = epicerieProduct.map((product) => ({
      idEpicerieProduct: product._id,
      idProduct: product.idProduct._id,
      name: product.idProduct.name,
      reference: product.idProduct.reference,
      description: product.idProduct.description,
      image: product.idProduct.image,
      category: product.idProduct.category
        ? product.idProduct.category.categoryName
        : null,
      country: product.idProduct.country
        ? product.idProduct.country.countryName
        : null,
      label: product.idProduct.label ? product.idProduct.label.labelName : null,
      price: product.price,
      available: product.available,
    }));

    res.status(200).json(formattedProduct);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product details." });
  }
});

const getProductDetailsByIdEpicerieProduct = asyncHandler(async (req, res) => {
  try {
    // Check if authorization header is missing
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    // Decode the accessToken to extract user ID
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // Verify and decode the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Access the user ID from the decoded token
    const userId = decodedToken.UserInfo.id;

    // Retrieve the user's epicerie by user ID
    const epicerie = await Epicerie.findById(userId).select('-password');

    // Check if the epicerie exists for the user
    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie not found." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    // Extract the product ID from the request parameters
    const { idEpicerieProduct } = req.params;

    // Retrieve the epicerie product details using the product ID
    const epicerieProduct = await EpicerieProduct.find({
      _id: idEpicerieProduct,
    })
      .populate({
        path: "idProduct",
        populate: {
          path: "category country label",
          select: "categoryName countryName labelName",
        },
        select: "name category label country description image reference",
      })
      .lean();

    // Check if the product exists
    if (!epicerieProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    console.log({" epicerie Product " : epicerieProduct[0].idEpicerie.toString()})
    console.log({" user "  : userId})

    // Check if the product belongs to the user's epicerie
    if (epicerieProduct[0].idEpicerie.toString() !== userId) {
      return res.status(403).json({ error: "Unauthorized access to product." });
    }


    const formattedProduct = epicerieProduct.map((product) => ({
      idEpicerieProduct: product._id,
      idProduct: product.idProduct._id,
      name: product.idProduct.name,
      reference: product.idProduct.reference,
      description: product.idProduct.description,
      image: product.idProduct.image,
      category: product.idProduct.category
        ? product.idProduct.category.categoryName
        : null,
      country: product.idProduct.country
        ? product.idProduct.country.countryName
        : null,
      label: product.idProduct.label ? product.idProduct.label.labelName : null,
      price: product.price,
      available: product.available,
    }));

    res.status(200).json(formattedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching product details." });
  }
});

const updateEpicerieProduct = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  const idEpicerie = decodedToken.UserInfo.id;
  const { id } = req.params;
  const { price, available } = req.body;

  try {
    const epicerie = await Epicerie.findById(idEpicerie).select('-password');

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvée." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    const epicerieProduct = await EpicerieProduct.findById(id);

    if (!epicerieProduct) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    // Vérifiez si le produit appartient à l'épicerie spécifiée
    if (epicerieProduct.idEpicerie.toString() !== idEpicerie) {
      return res
        .status(403)
        .json({ error: "Ce produit n'appartient pas à cette épicerie." });
    }

    if (price) {
      epicerieProduct.price = price;
    }

    if (typeof available !== 'undefined' && available !== null) {
      epicerieProduct.available = available;
    }

    await epicerieProduct.save();
    res.status(200).json({ message: "Produit modifié avec succès !" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
  }
});

const deleteEpicerieProductById = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  // Decode the accessToken to extract user ID
  const accessToken = req.headers.authorization.replace("Bearer ", "");
  // Verify and decode the token
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  // Access the user ID from the decoded token
  const userId = decodedToken.UserInfo.id;

  // Retrieve the user's epicerie by user ID
  const epicerie = await Epicerie.findById(userId).select('-password');

  const { id } = req.params;

  if (!epicerie) {
    return res.status(404).json({ error: "Epicerie non trouvée." });
  }

  if (epicerie.status == "inactif") {
    return res.status(404).json({ message: "Veuillez activez votre compte" });
  }

  if (!id) {
    return res.status(400).json({ message: "ID du produit requis." });
  }

  try {
    const product = await EpicerieProduct.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    // Vérifiez si le produit appartient à l'épicerie spécifiée
    if (product.idEpicerie.toString() !== userId) {
      return res
        .status(403)
        .json({ error: "Ce produit n'appartient pas à cette épicerie." });
    }

    await EpicerieProduct.deleteOne({ _id: id });

    const reply = `Produit supprimé.`;
    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du produit d'épicerie." });
  }
});

const deleteEpicerieProductsByNameList = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  // Decode the accessToken to extract user ID
  const accessToken = req.headers.authorization.replace("Bearer ", "");
  // Verify and decode the token
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

  // Access the user ID from the decoded token
  const userId = decodedToken.UserInfo.id;

  // Retrieve the user's epicerie by user ID
  const epicerie = await Epicerie.findById(userId).select('-password');

  if (!epicerie) {
    return res.status(404).json({ error: "Epicerie non trouvée." });
  }

  if (epicerie.status == "inactif") {
    return res.status(404).json({ message: "Veuillez activez votre compte" });
  }

  const { productNameList } = req.body;

  if (
    !productNameList ||
    !Array.isArray(productNameList) ||
    productNameList.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Liste de noms de produits requis." });
  }

  try {
    // Find the corresponding product documents based on product names
    const products = await Product.find({ name: { $in: productNameList } });

    // Extract the IDs of the found products
    const productIds = products.map((product) => product._id);

    // Delete the corresponding EpicerieProduct documents based on product IDs
    const deleteResult = await EpicerieProduct.deleteMany({
      idEpicerie: epicerie._id,
      idProduct: { $in: productIds },
    });

    if (deleteResult.deletedCount === 0) {
      return res
        .status(404)
        .json({ error: "Aucun produit correspondant trouvé." });
    }

    const reply = `Produits ${productNameList.join(", ")} supprimés.`;
    res.status(200).json({ message: reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression des produits d'épicerie.",
    });
  }
});

module.exports = {
  createEpicerieProduct,
  getEpicerieProductByIdEpicerie,
  updateEpicerieProduct,
  deleteEpicerieProductById,
  deleteEpicerieProductsByNameList,
  getProductDetailsByIdProduct,
  getProductDetailsByIdEpicerieProduct,
};

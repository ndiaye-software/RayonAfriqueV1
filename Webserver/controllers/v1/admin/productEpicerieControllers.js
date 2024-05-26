const EpicerieProduct = require("../../../models/EpicerieProduct");
const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");
const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");

const createEpicerieProduct = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }
  const { idEpicerie, idProduct, price, available } = req.body;

  if (!idEpicerie || !idProduct || !price || !available) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const epicerieProduct = new EpicerieProduct({
      idEpicerie,
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

const getEpicerieProduct = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  try {
    const epicerieProduct = await EpicerieProduct.find()
      .populate({
        path: "idProduct",
        select: "name category label country description description image reference reference", // Sélectionnez les champs que vous voulez afficher
      })
      .lean();

    if (!epicerieProduct) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    const formattedProducts = [];

    for (const product of epicerieProduct) {
      if (!product.idProduct) {
        continue;
      }

      formattedProducts.push({
        _id: product._id,
        idEpicerie: product.idEpicerie,
        idEpicerieProduct: product.idProduct._id,
        name: product.idProduct.name,
        reference: product.idProduct.reference,
        description: product.idProduct.description,
        image: product.idProduct.image,
        category: product.idProduct.category ? product.idProduct.category.categoryName : null,
        country: product.idProduct.country ? product.idProduct.country.countryName : null,
        label: product.idProduct.label ? product.idProduct.label.labelName : null,
        price: product.price,
        available: product.available,
      });
    }

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des produits d'épicerie.",
      });
  }
});


const getEpicerieProductByIdEpicerie = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  try {
    const { idEpicerie } = req.params;

    const epicerieProduct = await EpicerieProduct.find({
      idEpicerie: idEpicerie,
    })
      .populate({
        path: "idProduct",
        select: "name category label country description image reference", // Sélectionnez les champs que vous voulez afficher
      })
      .lean();

    if (!epicerieProduct || epicerieProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    const formattedProducts = epicerieProduct.map((epicerieProduct) => ({
      _id: epicerieProduct._id,
      idEpicerie: epicerieProduct.idEpicerie,
      idEpicerieProduct: epicerieProduct.idProduct._id,
      name: epicerieProduct.idProduct.name,
      reference: epicerieProduct.idProduct.reference,
      description: epicerieProduct.idProduct.description,
      image: epicerieProduct.idProduct.image,
      category: epicerieProduct.idProduct.category ? epicerieProduct.idProduct.category.categoryName: null,
      country: epicerieProduct.idProduct.country ? epicerieProduct.idProduct.country.countryName : null,
      label: epicerieProduct.idProduct.label ? epicerieProduct.idProduct.label.labelName : null,
      price: epicerieProduct.price,
      available: epicerieProduct.available,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des produits d'épicerie.",
      });
  }
});

const updateEpicerieProduct = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  const { id } = req.params;
  const { idEpicerie, idProduct, price, available } = req.body;

  try {
    const epicerieProduct = await EpicerieProduct.findById(id);

    if (!epicerieProduct) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    if (idEpicerie) {
      epicerieProduct.idEpicerie = idEpicerie;
    }

    if (idProduct) {
      epicerieProduct.idProduct = idProduct;
    }

    if (price) {
      epicerieProduct.price = price;
    }

    if (available) {
      epicerieProduct.available = available;
    }

    await epicerieProduct.save();
    res.status(200).json(epicerieProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
  }
});

const deleteEpicerieProduct = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }
  
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "product ID Required" });
  }

  try {
    const product = await EpicerieProduct.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    await EpicerieProduct.deleteOne();

    const reply = `Product deleted`;

    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du produit d'épicerie." });
  }
});

module.exports = {
  createEpicerieProduct,
  getEpicerieProduct,
  getEpicerieProductByIdEpicerie,
  updateEpicerieProduct,
  deleteEpicerieProduct,
};

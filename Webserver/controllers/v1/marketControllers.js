const ProductUser = require("../../models/ProductUser");
const User = require("../../models/Users");
const asyncHandler = require("express-async-handler");

// Charger les produits des fournisseurs
const getMarketProduct = asyncHandler(async (req, res) => {
  try {
    const products = await ProductUser.aggregate([
      {
        $match: { available: true }, // Filtrer les produits disponibles
      },
      {
        $lookup: {
          from: "users",
          localField: "iduser",
          foreignField: "_id",
          as: "user",
        },
      },
      {
        $match: { "user.0.statut": 2 }, // Filtrer les fournisseurs avec statut égal à 2
      },
      {
        $lookup: {
          from: "products",
          localField: "idproduct",
          foreignField: "_id",
          as: "product",
        },
      },
      {
        $project: {
          _id: 1,
          price: 1,
          "product.name": 1,
          "product.image": 1,
          "product.description": 1,
          "user.name": 1,
        },
      },
    ]);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({
          message: "Aucun produit disponible trouvé chez les fournisseurs.",
        });
    }

    const fournisseurProducts = products.map((product) => ({
      name: product.product[0].name,
      image: product.product[0].image,
      description: product.product[0].description,
      id: product._id,
      price: product.price,
      nomFournisseur: product.user[0].name,
    }));

    res.json(fournisseurProducts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Charger les détails d'un produit d'un fournisseur par ID de produit pour les fournisseurs
const getMarketProductDetailFournisseur = asyncHandler(async (req, res) => {
  const idproductUser = req.params.idproductUser;

  try {
    const productDetails = await ProductUser.findById(idproductUser)
      .populate({
        path: "idproduct",
        select: "name description image",
      })
      .populate({
        path: "iduser",
        select: "name",
      });

    if (!productDetails) {
      return res
        .status(404)
        .json({ message: "Détails du produit non trouvés." });
    }

    const product = {
      name: productDetails.idproduct.name,
      image: productDetails.idproduct.image,
      description: productDetails.idproduct.description,
      id: productDetails._id,
      nomFournisseur: productDetails.iduser ? productDetails.iduser.name : "",
    };

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Charger les détails d'un produit d'un fournisseur par ID de produit pour les épiceries
const getMarketProductDetailEpicerie = asyncHandler(async (req, res) => {
  const idproductUser = req.params.idproductUser;

  try {
    const productDetails = await ProductUser.findById(idproductUser)
      .populate({
        path: "idproduct",
        select: "name description image",
      })
      .populate({
        path: "iduser",
        select: "name mail",
      });

    if (!productDetails) {
      return res
        .status(404)
        .json({ message: "Détails du produit non trouvés." });
    }

    const product = {
      name: productDetails.idproduct.name,
      image: productDetails.idproduct.image,
      description: productDetails.idproduct.description,
      id: productDetails._id,
      nomFournisseur: productDetails.iduser ? productDetails.iduser.name : "",
      mailFournisseur: productDetails.iduser ? productDetails.iduser.mail : "",
      prix: productDetails.price,
    };

    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
  getMarketProduct,
  getMarketProductDetailFournisseur,
  getMarketProductDetailEpicerie,
};

const express = require("express");
const Product = require("../../models/Product");
const ProductUser = require("../../models/ProductUser");
const CategoryProducts = require("../../models/CategoryProducts");
const CountryProducts = require("../../models/CountryProducts");
const asyncHandler = require("express-async-handler");

// Créer un produit par un fournisseur
const createProductFournisseur = asyncHandler(async (req, res) => {
  const {
    name,
    reference,
    categorieFromBody,
    pays,
    prix,
    disponibilité,
    description,
    image,
  } = req.body;

  const { idUser } = req.params;

  // Vérifier les champs obligatoires
  const missingFields = [];
  if (!name) {
    missingFields.push("Nom du produit");
  }
  if (!categorieFromBody) {
    missingFields.push("Catégorie");
  }
  if (!pays) {
    missingFields.push("Pays");
  }
  if (!prix) {
    missingFields.push("Prix");
  }
  if (!disponibilité) {
    missingFields.push("Disponibilité");
  }
  
  try {
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Champs manquants : ${missingFields.join(", ")}` });
    }

    // Rechercher la catégorie par son nom
    const categorie = await CategoryProducts.findOne({ nameCategory: categorieFromBody });
    if (!categorie) {
      return res.status(400).json({ message: "Catégorie non trouvée." });
    }

    // Rechercher le pays par son nom
    const country = await CountryProducts.findOne({ countryName: pays });
    if (!country) {
      return res.status(400).json({ message: "Pays non trouvé." });
    }

    // Créer le produit
    const newProduct = new Product({
      name: name,
      reference: reference,
      category: categorie._id,
      country: country._id,
    });

    // Sauvegarder le produit dans la base de données
    await newProduct.save();

    // Créer le produit utilisateur associé
    const newProductUser = new ProductUser({
      idproduct: newProduct._id,
      iduser: idUser,
      price: prix,
      available: disponibilité,
    });

    if (description) {
      newProductUser.description = description;
    }

    if (image) {
      newProductUser.image = image;
    }

    // Sauvegarder le produit utilisateur dans la base de données
    await newProductUser.save();

    res.status(201).json({ message: "Produit créé avec succès." });
  } catch (error) {
    console.error(error);
    if (error.message === "Données du produit invalides.") {
      return res.status(400).json({ error: error.message });
    } else {
      return res.status(500).json({ error: "Erreur lors de la sauvegarde du produit dans la base de données." });
    }
  }
});


module.exports = {
  createProductFournisseur,
};

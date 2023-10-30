const Epicerie = require("../../../models/Epicerie");
const EpicerieProduct = require("../../../models/EpicerieProduct");
const asyncHandler = require("express-async-handler");

const createEpicerieProduct = asyncHandler(async (req, res) => {

    // Vérifier si l'utilisateur est une épicerie
    const { idEpicerie } = req.params; // Obtenez l'ID de l'épicerie à partir des paramètres de la requête
  
    // Recherchez l'épicerie dans la base de données en utilisant son ID
    const epicerie = await Epicerie.findById(idEpicerie);

    if (!epicerie) {
      // Si l'épicerie n'est pas trouvée, renvoyez une réponse appropriée
      return res.status(404).json({ message: "Épicerie non trouvée." });
    }
    const {
      name,
      reference,
      price,
      ingredients,
      description,
      image,
      available,
      category,
      country,
    } = req.body;

    if (!name || !price || !category || !country || !image || !available ) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
      }
  
    try {
      const newEpicerieProduct = new EpicerieProduct({
        idEpicerie,
        name,
        reference,
        price,
        ingredients,
        description,
        image,
        available,
        category,
        country,
      });
  
      await newEpicerieProduct.save();
      res.status(201).json(newEpicerieProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la création du produit de l'épicerie." });
    }
  });

  const getEpicerieProducts = asyncHandler(async (req, res) => {
    try {
      const { idEpicerie } = req.params;
  
      // Recherche des produits de l'épicerie spécifiée par idEpicerie
      const epicerieProducts = await EpicerieProduct.find({ idEpicerie: idEpicerie });
  
      if (!epicerieProducts) {
        return res.status(404).json({ message: "Aucun produit trouvé pour cette épicerie." });
      }
  
      res.status(200).json(epicerieProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des produits d'épicerie." });
    }
  });
  

  const updateEpicerieProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const {
      name,
      reference,
      price,
      ingredients,
      description,
      image,
      available,
      category,
      country,
    } = req.body;
  
    try {
      const epicerieProduct = await EpicerieProduct.findById(id);
  
      if (!epicerieProduct) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }
  
      epicerieProduct.name = name;
      epicerieProduct.reference = reference;
      epicerieProduct.price = price;
      epicerieProduct.ingredients = ingredients;
      epicerieProduct.description = description;
      epicerieProduct.image = image;
      epicerieProduct.available = available;
      epicerieProduct.category = category;
      epicerieProduct.country = country;
  
      await epicerieProduct.save();
      res.status(200).json(epicerieProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
    }
  });

  const deleteEpicerieProduct = asyncHandler(async (req, res) => {
    const { id } = req.params;
  
    try {
      const epicerieProduct = await EpicerieProduct.findById(id);
  
      if (!epicerieProduct) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }
  
      await epicerieProduct.remove();
      res.status(200).json({ message: "Produit d'épicerie supprimé avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la suppression du produit d'épicerie." });
    }
  });
  
  module.exports = {
    createEpicerieProduct,
    getEpicerieProducts,
    updateEpicerieProduct,
    deleteEpicerieProduct
  };
  
  
  
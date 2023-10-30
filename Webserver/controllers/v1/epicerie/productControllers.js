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
    const { idProduct } = req.params;
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
      const epicerieProduct = await EpicerieProduct.findById(idProduct);
  
      if (!epicerieProduct) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }

      if(name){
        epicerieProduct.name = name;
      }

      if(reference){
        epicerieProduct.reference = reference;
      }

      if(price){
        epicerieProduct.price = price;       
      }

      if(ingredients){
        epicerieProduct.ingredients = ingredients;        
      }

      if(description){
        epicerieProduct.description = description;       
      }

      if(image){
        epicerieProduct.image = image;        
      }

      if(available){
        epicerieProduct.available = available;       
      }

      if(category){
        epicerieProduct.category = category;       
      }

      if(country){
        epicerieProduct.country = country;       
      }

  
      await epicerieProduct.save();
      res.status(200).json(epicerieProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
    }
  });

  const deleteEpicerieProduct = asyncHandler(async (req, res) => {
    const { idProduct } = req.params;

    if (!idProduct) {
      return res.status(400).json({ message: "product ID Required" });
    }
  
    try {
      const epicerieProduct = await EpicerieProduct.findById(idProduct);
  
      if (!epicerieProduct) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }
  
      const result = await EpicerieProduct.deleteOne();

      const reply = `Product with ID ${result._id} deleted`
    
      res.status(200).json(reply);

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
  
  
  
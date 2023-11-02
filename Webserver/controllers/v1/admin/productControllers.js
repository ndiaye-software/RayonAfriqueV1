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
      label
    } = req.body;

    if (!name || !category || !country || !image || !label) {
        return res.status(400).json({ message: "Tous les champs sont requis" });
      }  
  
    try {
      const product = new Product({
        name,
        reference,
        ingredients,
        description,
        image,
        category,
        country,
        label
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
      const product = await Product.find();
  
      if (!Product) {
        return res.status(404).json({ message: "Aucun produit trouvé pour cette épicerie." });
      }
  
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des produits d'épicerie." });
    }
  });
  

  const updateProduct = asyncHandler(async (req, res) => {
    const { idProduct } = req.params;
    const {
      name,
      reference,
      ingredients,
      description,
      image,
      category,
      country,
      label
    } = req.body;
  
    try {
      const product = await Product.findById(idProduct);
  
      if (!product) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }

      if(name){
        product.name = name;
      }

      if(reference){
        product.reference = reference;
      }

      if(ingredients){
        product.ingredients = ingredients;        
      }

      if(description){
        product.description = description;       
      }

      if(image){
        product.image = image;        
      }

      if(category){
        product.category = category;       
      }

      if(country){
        product.country = country;       
      }

      if(label){
        product.label = label;       
      }
  
      await product.save();
      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
    }
  });

  const deleteProduct = asyncHandler(async (req, res) => {
    const { idProduct } = req.params;

    if (!idProduct) {
      return res.status(400).json({ message: "product ID Required" });
    }
  
    try {
      const product = await Product.findById(idProduct);
  
      if (!product) {
        return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
      }
  
      const result = await Product.deleteOne();

      const reply = `Product with ID ${result._id} deleted`
    
      res.status(200).json(reply);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la suppression du produit d'épicerie." });
    }
  });
  
  module.exports = {
    createProduct,
    getProduct,
    updateProduct,
    deleteProduct
  };
  
  
  
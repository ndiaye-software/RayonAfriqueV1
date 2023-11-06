const Cart = require("../../../models/Cart");
const Product = require("../../../models/Product");
const User = require("../../../models/User");
const asyncHandler = require("express-async-handler");

//Enregistrer un produit
const saveProduct = asyncHandler(async (req, res) => {
  try {
    const { idUser, idProduct } = req.body;

    // Vérifiez si le produit est déjà enregistré dans le panier de l'utilisateur
    const existingProduct = await Cart.findOne({ idUser, idProduct });

    if (existingProduct) {
      return res
        .status(400)
        .json({ message: "Ce produit est déjà enregistré dans votre panier." });
    }

    // Créez un nouveau produit dans le panier de l'utilisateur
    const cartProduct = new Cart({ idUser, idProduct });
    await cartProduct.save();

    res.status(201).json(cartProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de l'enregistrement du produit dans le panier.",
      });
  }
});

//Chercher les produits enregistrés d'un :utilisateur
const getSavedProducts = asyncHandler(async (req, res) => {
  try {
    const { idUser } = req.params;

    // Recherchez les produits enregistrés dans le panier de l'utilisateur
    const savedProducts = await Cart.find({ idUser }).lean();

    // Array pour stocker les produits formatés
    const formattedProducts = [];

    // Parcourez les produits enregistrés
    for (const product of savedProducts) {
      // Recherchez les détails du produit associé
      const productDetails = await Product.findById(product.idProduct)
        .populate("category")
        .populate("country")
        .populate("label")
        .lean();

      if (productDetails) {
        // Formatez les propriétés du produit
        const formattedProduct = {
          idCart: product._id,
          idUser: product.idUser,
          idProduct: productDetails._id,
          name: productDetails.name,
          reference: productDetails.reference,
          ingredients: productDetails.ingredients,
          description: productDetails.description,
          image: productDetails.image,
          category: productDetails.category ? productDetails.category.categoryName : null,
          country: productDetails.country ? productDetails.country.countryName : null,
          label: productDetails.label ? productDetails.label.labelName : null,
        };

        // Ajoutez le produit formaté à l'array
        formattedProducts.push(formattedProduct);
      }
    }

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits enregistrés.",
    });
  }
});

// Supprimer totalement un Cart
const deleteCart = asyncHandler(async (req, res) => {
  try {
    const { idUser } = req.params;

    // Supprimez tous les produits enregistrés dans le panier de l'utilisateur
    await Cart.deleteMany({ idUser });

    res.status(200).json({ message: "Tous les produits enregistrés ont été supprimés avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression des produits enregistrés.",
    });
  }
});

// Supprimer un produit d'un Cart
const deleteProductCart = asyncHandler(async (req, res) => {
  try {
    const { idUser, idProduct} = req.params;

    // Vérifiez si le produit existe dans le panier de l'utilisateur
    const existingProduct = await Cart.findOne({ idProduct, idUser });

    if (!existingProduct) {
      return res.status(404).json({ message: "Produit non trouvé dans le panier de l'utilisateur." });
    }

    // Supprimez le produit du panier de l'utilisateur
    await Cart.findByIdAndDelete(existingProduct._id);

    res.status(200).json({ message: "Produit supprimé du panier de l'utilisateur avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la suppression du produit du panier de l'utilisateur.",
    });
  }
});


module.exports = {
  saveProduct,
  getSavedProducts,
  deleteCart,
  deleteProductCart
};

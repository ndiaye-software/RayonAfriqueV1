const ProductUser = require('../../models/ProductUser');
const Product = require('../../models/Product');
const Users = require('../../models/Users');
const asyncHandler = require('express-async-handler');

const getGroceryByProduct = asyncHandler(async (req, res) => {
  try {
    const { idProduct } = req.params;

    const productUsers = await ProductUser.find({
      idproduct: idProduct, // Rechercher les utilisateurs liés à ce produit
      available: true, // Produits disponibles
    }).populate('iduser');

    if (!productUsers || productUsers.length === 0) {
      return res.status(404).json({ message: 'Aucune épicerie ou fournisseur disponible pour ce produit.', findproductUser: productUsers, findproduct: idProduct });
    }

    const groceryStores = [];
    
    for (const productUser of productUsers) {
      if (productUser.iduser && productUser.iduser.statut === 1) {
        // Trouver le nom du produit depuis le modèle Product
        const product = await Product.findById(productUser.idproduct);
        if (product) {
          groceryStores.push({
            nomEpicerie: productUser.iduser.nameCompany,
            image: productUser.image,
            adresse: productUser.iduser.address,
            prix: productUser.price,
            nomProduit: product.name, // Accéder au nom du produit depuis le modèle Product
          });
        }
      }
    }

    if (groceryStores.length === 0) {
      return res.status(404).json({ message: 'Aucune épicerie disponible pour ce produit.', findproductUser: productUsers, findproduct: idProduct });
    }

    return res.json(groceryStores);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des épiceries pour ce produit.' });
  }
});

module.exports = {
  getGroceryByProduct
};

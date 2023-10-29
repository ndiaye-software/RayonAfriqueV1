const ProductUser = require('../../models/ProductUser');
const User = require('../../models/Users');
const asyncHandler = require('express-async-handler');

const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
    const groceryUsers = await User.find({ statut: 1 }); // Récupérer les épiciers (statut=1)

    if (!groceryUsers || groceryUsers.length === 0) {
      return res.status(404).json({ message: 'Aucune épicerie trouvée.' });
    }

    const groceryUserIds = groceryUsers.map((user) => user._id);

    const groceryProducts = await ProductUser.find({
      iduser: { $in: groceryUserIds }, // Rechercher les produits des épiciers
      available: true, // Produits disponibles
    }).populate('idproduct');

    if (!groceryProducts || groceryProducts.length === 0) {
      return res.status(404).json({ message: 'Aucun produit disponible trouvé dans les épiceries.' });
    }

    // Transformation des données pour extraire uniquement les informations du produit
    const productInfo = groceryProducts.map((productUser) => productUser.idproduct);

    return res.json(productInfo);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des produits des épiceries.' });
  }
});

module.exports = {
  getGroceryProducts
};

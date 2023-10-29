const Users = require('../../models/Users');
const ProductUser = require('../../models/ProductUser');
const Product = require('../../models/Product');
const asyncHandler = require('express-async-handler');

// Charger les fournisseurs
const getFournisseur = asyncHandler( async (req, res) => {
  try {
    const fournisseurs = await Users.find({ statut: 2 }).select("-password").lean(); // Récupérer les fournisseurs (statut=2)
    res.json(fournisseurs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Charger les produits d'un fournisseur par nom
const getFournisseurDetail = asyncHandler( async (req, res) => {
  const nameCompany = req.params.nameCompany;

  try {
    const user = await Users.findOne({ nameCompany }); // Rechercher le fournisseur par nom

    if (!user) {
      return res.status(404).json({ message: 'Fournisseur non trouvé.' });
    }

    const products = await ProductUser.find({
      iduser: user._id,
    }).populate('idproduct');

    const userDetail = {
      nomFournisseur: user.name,
      descriptionUser: user.description,
      imageUser: user.image,
      mail: user.mail,
    };

    const productDetails = products.map((productUser) => ({
      name: productUser.idproduct.name,
      prix: productUser.price,
      descriptionProduct: productUser.idproduct.description,
      imageProduct: productUser.idproduct.image,
    }));

    res.json({
      user: userDetail,
      produit: productDetails,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = {
    getFournisseur,
    getFournisseurDetail
  };
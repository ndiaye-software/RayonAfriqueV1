const Epicerie = require("../../../models/Epicerie");
const Label = require("../../../models/Label");
const Category = require("../../../models/Category");
const Country = require("../../../models/Country");
const EpicerieProduct = require("../../../models/EpicerieProduct");
const Product = require("../../../models/Product");
const geolib = require("geolib");
const asyncHandler = require("express-async-handler");

//Distance entre deux points
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Rayon de la Terre en km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance en km
  return distance;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

//Lister les produits des épiceries
const getGroceryProducts = asyncHandler(async (req, res) => {
  try {
    // Recherche des produits disponibles dans EpicerieProduct
    const productsInEpicerie = await EpicerieProduct.find({ available: true });

    // Récupération des IDs des produits disponibles
    const productIds = productsInEpicerie.map(
      (epicerieProduct) => epicerieProduct.idProduct
    );

    // Utilisation d'un ensemble pour éliminer les doublons
    const uniqueProductIds = new Set(productIds);

    // Recherche des détails des produits correspondants dans le modèle Product
    const availableProducts = await Product.find({
      _id: { $in: [...uniqueProductIds] },
    })
      .populate({
        path: "country",
        select: "countryName",
        options: { lean: true },
      })
      .populate({
        path: "category",
        select: "categoryName",
        options: { lean: true },
      })
      .populate({
        path: "label",
        select: "labelName",
        options: { lean: true },
      })
      .lean();

    const shopProducts = availableProducts.map((product) => ({
      id: product._id,
      name: product.name,
      ingredients: product.ingredients,
      description: product.description,
      image: product.image,
      categoryName: product.category ? product.category.categoryName : null,
      countryName: product.country ? product.country.countryName : null,
      labelName: product.label ? product.label.labelName : null,
    }));

    // Envoi des produits disponibles en réponse
    res.json(shopProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche du produit." });
  }
});

//Lister les épiceries vendant un :produit
const getGroceryByProduct = asyncHandler(async (req, res) => {
  try {
    const { name } = req.params;
    const { userPosition } = req.body;

    console.log(req.body);

    const product = await Product.findOne({ name });

    if (!product) {
      return res.status(404).json({ error: "Produit non disponible." });
    }

    const groceries = await EpicerieProduct.find({
      idProduct: product._id,
      available: true,
    }).populate({
      path: "idEpicerie",
      select: "nameCompany image description phone latitude longitude",
    });

    if (userPosition) {
      const { latitude: userLat, longitude: userLon } = userPosition;

      const formattedGroceries = groceries.map((grocery) => {
        const { nameCompany, description, latitude, longitude, image } = grocery.idEpicerie;
        const distance = getDistance(userLat, userLon, latitude, longitude);
        return {
          nomEpicerie: nameCompany,
          adresse: description,
          latitude,
          longitude,
          image,
          nomProduit: name,
          prix: grocery.price,
          distance: distance.toFixed(2),
        };
      });

      // Tri des épiceries par ordre de distance
      formattedGroceries.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));

      return res.status(200).json(formattedGroceries);
    }

    // Si la position de l'utilisateur n'est pas fournie, retournez les épiceries sans tri
    const formattedGroceries = groceries.map((grocery) => {
      const { nameCompany, description, latitude, longitude, image } = grocery.idEpicerie;
      return {
        nomEpicerie: nameCompany,
        adresse: description,
        latitude,
        longitude,
        image,
        nomProduit: name,
        prix: grocery.price, // Mettez à jour l'accès au champ price ici
      };
    });

    res.status(200).json(formattedGroceries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la recherche des épiceries." });
  }
});



module.exports = {
  getGroceryProducts,
  getGroceryByProduct
};

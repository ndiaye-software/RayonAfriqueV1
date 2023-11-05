const Epicerie = require("../../../models/Epicerie");
const EpicerieProduct = require("../../../models/EpicerieProduct");
const asyncHandler = require("express-async-handler");

const readEpicerieById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const epicerie = await Epicerie.findById(id).select("-password");

    if (!epicerie) {
      return res
        .status(404)
        .json({ message: "Aucune épicerie trouvée avec cet ID." });
    }

    const formattedResult = {
      _id: epicerie._id,
      name: epicerie.name,
      phone: epicerie.phone,
      image: epicerie.image,
      description: epicerie.description,
      longitude: epicerie.longitude,
      latitude: epicerie.latitude,
    };

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération de l'épicerie." });
  }
});

const searchEpicerieByName = asyncHandler(async (req, res) => {
  try {
    const { nameCompany } = req.body;
    const epicerie = await Epicerie.findOne({
      nameCompany: { $regex: nameCompany, $options: "i" }, // Recherche par nom de l'épicerie (insensible à la casse)
    });

    if (!epicerie) {
      return res
        .status(404)
        .json({ message: "Aucune épicerie trouvée avec ce nom." });
    }

    const formattedResult = {
        _id: epicerie._id,
        name: epicerie.name,
        phone: epicerie.phone,
        image: epicerie.image,
        description: epicerie.description,
        longitude: epicerie.longitude,
        latitude: epicerie.latitude,
      };

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la recherche de l'épicerie." });
  }
});

//Lire le profil d'une épicerie
const readEpicerieProfile = asyncHandler(async (req, res) => {
  try {
    const { idEpicerie } = req.params; // Obtenez l'ID de l'épicerie à partir des paramètres de la requête

    // Recherchez l'épicerie dans la base de données en utilisant son ID
    const epicerie = await Epicerie.findById(idEpicerie).select('name mail nameCompany image description phone');;

    if (!epicerie) {
      // Si l'épicerie n'est pas trouvée, renvoyez une réponse appropriée
      return res.status(404).json({ message: "Épicerie non trouvée." });
    }

    // Si l'épicerie est trouvée et que le compte correspond, renvoyez ses informations au client
    res.status(200).json(epicerie);
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur au client
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la lecture du profil de l'épicerie." });
  }
});

const getEpicerieProductByIdEpicerie = asyncHandler(async (req, res) => {
  try {
    const { idEpicerie } = req.params;

    const epicerieProduct = await EpicerieProduct.find({
      idEpicerie: idEpicerie,
    })
      .populate({
        path: "idProduct",
        select: "name category label country description image reference", // Sélectionnez les champs que vous voulez afficher
      })
      .lean();

    if (!epicerieProduct || epicerieProduct.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    const formattedProducts = epicerieProduct.map((epicerieProduct) => ({
      _id: epicerieProduct._id,
      idEpicerie: epicerieProduct.idEpicerie,
      idEpicerieProduct: epicerieProduct.idProduct._id,
      name: epicerieProduct.idProduct.name,
      reference: epicerieProduct.idProduct.reference,
      description: epicerieProduct.idProduct.description,
      image: epicerieProduct.idProduct.image,
      category: epicerieProduct.idProduct.category ? epicerieProduct.idProduct.category.categoryName: null,
      country: epicerieProduct.idProduct.country ? epicerieProduct.idProduct.country.countryName : null,
      label: epicerieProduct.idProduct.label ? epicerieProduct.idProduct.label.labelName : null,
      price: epicerieProduct.price,
      available: epicerieProduct.available,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la récupération des produits d'épicerie.",
      });
  }
});

module.exports = {
  readEpicerieById,
  searchEpicerieByName,
  readEpicerieProfile,
  getEpicerieProductByIdEpicerie
};

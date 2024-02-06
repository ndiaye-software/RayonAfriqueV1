const EpicerieProduct = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");
const authenticateUser = require("../../../middleware/verifyJWT");
const jwt = require("jsonwebtoken");

const createEpicerieProduct = asyncHandler(async (req, res) => {
  const { idEpicerie } = req.params;

  const epicerie = await Epicerie.findById(idEpicerie);

  if (!epicerie) {
    return res.status(404).json({ error: "Epicerie non trouvé." });
  }

  const { idProduct, price, available } = req.body;

  if (!idEpicerie || !idProduct || !price || !available) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const epicerieProduct = new EpicerieProduct({
      idEpicerie,
      idProduct,
      price,
      available,
    });

    await epicerieProduct.save();
    res.status(201).json(epicerieProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la création du produit" });
  }
});

const getEpicerieProductByIdEpicerie = asyncHandler(async (req, res) => {
  try {
    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }

    // Decode the accessToken to extract user ID
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    // Verify and decode the token
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );

    // Access the user ID from the decoded token
    const userId = decodedToken.UserInfo.id;
    console.log(userId)

    // Retrieve the user's epicerie by user ID
    const epicerie = await Epicerie.findById(userId);

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    // Retrieve epicerie products using the user ID
    const epicerieProduct = await EpicerieProduct.find({
      idEpicerie: userId,
    })
      .populate({
        path: "idProduct",
        populate: {
          path: "category country label",
          select: "categoryName countryName labelName",
        },
        select: "name category label country description image reference",
      })
      .lean();

    if (!epicerieProduct || epicerieProduct.length === 0) {
      return res.json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    // Format and send the response
    const formattedProducts = epicerieProduct.map((epicerieProduct) => ({
      idEpicerieProduct: epicerieProduct._id,
      idProduct: epicerieProduct.idProduct._id,
      name: epicerieProduct.idProduct.name,
      reference: epicerieProduct.idProduct.reference,
      description: epicerieProduct.idProduct.description,
      image: epicerieProduct.idProduct.image,
      category: epicerieProduct.idProduct.category
        ? epicerieProduct.idProduct.category.categoryName
        : null,
      country: epicerieProduct.idProduct.country
        ? epicerieProduct.idProduct.country.countryName
        : null,
      label: epicerieProduct.idProduct.label
        ? epicerieProduct.idProduct.label.labelName
        : null,
      price: epicerieProduct.price,
      available: epicerieProduct.available,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

const updateEpicerieProduct = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET
  );

  const idEpicerie = decodedToken.UserInfo.id;
  console.log(idEpicerie)
  const { id } = req.params;
  const { price, available } = req.body;

  try {
    const epicerie = await Epicerie.findById(idEpicerie);
    const epicerieProduct = await EpicerieProduct.findById(id);

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvée." });
    }

    if (!epicerieProduct) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    // Vérifiez si le produit appartient à l'épicerie spécifiée
    if (epicerieProduct.idEpicerie.toString() !== idEpicerie) {
      return res
        .status(403)
        .json({ error: "Ce produit n'appartient pas à cette épicerie." });
    }

    if (price) {
      epicerieProduct.price = price;
    }

    if (available) {
      epicerieProduct.available = available;
    }

    await epicerieProduct.save();
    res.status(200).json(epicerieProduct);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour du produit d'épicerie." });
  }
});

const deleteEpicerieProduct = asyncHandler(async (req, res) => {
  const { id, idEpicerie } = req.params;

  const epicerie = await Epicerie.findById(idEpicerie);

  if (!epicerie) {
    return res.status(404).json({ error: "Epicerie non trouvée." });
  }

  if (!id) {
    return res.status(400).json({ message: "ID du produit requis." });
  }

  try {
    const product = await EpicerieProduct.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    // Vérifiez si le produit appartient à l'épicerie spécifiée
    if (product.idEpicerie.toString() !== idEpicerie) {
      return res
        .status(403)
        .json({ error: "Ce produit n'appartient pas à cette épicerie." });
    }

    await EpicerieProduct.deleteOne({ _id: id });

    const reply = `Produit supprimé.`;
    res.status(200).json(reply);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du produit d'épicerie." });
  }
});

module.exports = {
  createEpicerieProduct,
  getEpicerieProductByIdEpicerie,
  updateEpicerieProduct,
  deleteEpicerieProduct,
};

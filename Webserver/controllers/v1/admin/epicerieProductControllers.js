const EpicerieProduct = require("../../../models/EpicerieProduct");
const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");

const createEpicerieProduct = asyncHandler(async (req, res) => {
  const { idEpicerie, idProduct, price, available } = req.body;

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
const createEpicerieProductNotExist = asyncHandler(async (req, res) => {
  try {
    const {
      name,
      reference,
      ingredients,
      description,
      image,
      category,
      country,
      label,
      epicerieId, // ID de l'épicerie liée au produit
      price,
    } = req.body;

    // Vérifier si le produit existe déjà par son nom ou sa référence
    let existingProduct = await Product.findOne({
      $or: [{ name }, { reference }],
    });

    if (existingProduct) {
      // Si le produit existe déjà, renvoyer un message approprié
      return res.status(400).json({ message: "Le produit existe déjà." });
    }

    if (!existingProduct) {
      // Si le produit n'existe pas, le créer
      existingProduct = await Product.create({
        name,
        reference,
        ingredients,
        description,
        image,
        category,
        country,
        label,
      });

      // Créer le lien entre le produit et l'épicerie
      const epicerieProduct = await EpicerieProduct.create({
        idEpicerie: epicerieId,
        idProduct: existingProduct._id,
        price,
        available: true, // Le produit est disponible par défaut lorsqu'il est créé
      });

      res.status(201).json(epicerieProduct);
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({
        error:
          "Erreur lors de la création du produit ou du lien avec l'épicerie.",
      });
  }
});

const getEpicerieProduct = asyncHandler(async (req, res) => {
  try {
    // Recherche des produits de l'épicerie spécifiée par idEpicerie
    const epicerieProduct = await EpicerieProduct.find();

    if (!epicerieProduct) {
      return res
        .status(404)
        .json({ message: "Aucun produit trouvé pour cette épicerie." });
    }

    res.status(200).json(epicerieProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération des produits d'épicerie.",
    });
  }
});

const updateEpicerieProduct = asyncHandler(async (req, res) => {
  const { idEpicerieProduct } = req.params;
  const { idEpicerie, idProduct, price, available } = req.body;

  try {
    const epicerieProduct = await EpicerieProduct.findById(idEpicerieProduct);

    if (!epicerieProduct) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    if (idEpicerie) {
      epicerieProduct.idEpicerie = idEpicerie;
    }

    if (idProduct) {
      epicerieProduct.idProduct = idProduct;
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
  const { idEpicerieProduct } = req.params;

  if (!idEpicerieProduct) {
    return res.status(400).json({ message: "product ID Required" });
  }

  try {
    const product = await EpicerieProduct.findById(idEpicerieProduct);

    if (!product) {
      return res.status(404).json({ error: "Produit d'épicerie non trouvé." });
    }

    const result = await Product.deleteOne();

    const reply = `Product with ID ${result._id} deleted`;

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
  createEpicerieProductNotExist,
  getEpicerieProduct,
  updateEpicerieProduct,
  deleteEpicerieProduct,
};

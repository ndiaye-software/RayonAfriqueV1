const EpicerieProduct = require("../../../models/EpicerieProduct");
const Epicerie = require("../../../models/Epicerie");
const Product = require("../../../models/Product");
const asyncHandler = require("express-async-handler");

const createEpicerieProduct = asyncHandler(async (req, res) => {
  
  const {idEpicerie} = req.params

  const epicerie = await Epicerie.findById(idEpicerie)

  if(!epicerie) {
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
    const { idEpicerie } = req.params;

    const epicerie = await Epicerie.findById(idEpicerie)

    if(!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    const epicerieProduct = await EpicerieProduct.find({
      idEpicerie: idEpicerie,
    })
      .populate({
        path: "idProduct",
        select: "name category label country description image reference",
      })
      .lean();

    if (!epicerieProduct || epicerieProduct.length === 0) {
      return res
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

    console.log(formattedProducts)

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

const updateEpicerieProduct = asyncHandler(async (req, res) => {
  const { idEpicerie, id } = req.params;
  const { idProduct, price, available } = req.body;

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

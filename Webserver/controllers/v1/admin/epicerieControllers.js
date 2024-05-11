const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");
const emailvalidator = require("email-validator");
const phonevalidator = require("validator");
const bcrypt = require("bcrypt");

const createEpicerie = asyncHandler(async (req, res) => {
  const {
    name,
    mail,
    phone,
    password1,
    password2,
    nameCompany,
    image,
    description,
    longitude,
    latitude,
  } = req.body;

  if (
    !name ||
    !phone ||
    !password1 ||
    !password2 ||
    !mail ||
    !nameCompany ||
    !longitude ||
    !latitude
  ) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    //mot de passe identique
    if (password1 !== password2) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne sont pas identiques." });
    }

    const phoneDuplicate = await Epicerie.findOne({ phone })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec()
      .select('-password -description -mail -adresse -longitude -latitude -nameCompany');

    if (phoneDuplicate) {
      return res
        .status(409)
        .json({ message: "Numéro de téléphone déjà utilisé." });
    }
    // Check for duplicate mail
    const duplicate = await Epicerie.findOne({ mail })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec()
      .select('-password -phone -description -adresse -longitude -latitude -nameCompany');

    if (duplicate) {
      return res.status(409).json({ message: "L'utilisatur existe déjà" });
    }

    if (!emailvalidator.validate(mail)) {
      return res.status(409).json({ message: "L'email n'est pas valide" });
    }

    if (!phonevalidator.isMobilePhone(phone)) {
      return res
        .status(409)
        .json({ message: "Le numéro rentré n'est pas valide" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password1, 10); // salt rounds

    // Créer un nouvel utilisateur
    const newEpicerie = new Epicerie({
      name,
      mail,
      phone,
      nameCompany,
      longitude,
      latitude,
      image,
      description,
      password: hashedPwd,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newEpicerie.save();

    res.json({
      message: "Epicerie créée avec succès.",
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de l'inscription." });
  }
});

const readEpicerie = asyncHandler(async (req, res) => {
  try {
    const epiceries = await Epicerie.find().select("-password");

    const formattedResult = epiceries.map((epicerie) => ({
      _id: epicerie._id,
      name: epicerie.name,
      phone: epicerie.phone,
      image: epicerie.image,
      description: epicerie.description,
      longitude: epicerie.longitude,
      latitude: epicerie.latitude,
    }));
    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des épiceries." });
  }
});

const updateEpicerie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const updatedEpicerie = await Epicerie.findByIdAndUpdate(id, req.body, {
      new: true, // Pour retourner l'épicerie mise à jour
    });
    const formattedResult = {
        _id: updatedEpicerie._id,
        name: updatedEpicerie.name,
        phone: updatedEpicerie.phone,
        image: updatedEpicerie.image,
        description: updatedEpicerie.description,
        longitude: updatedEpicerie.longitude,
        latitude: updatedEpicerie.latitude,
      };
    res.status(200).json(formattedResult);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la mise à jour de l'épicerie." });
  }
});

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

const deleteEpicerie = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedEpicerie = await Epicerie.findByIdAndDelete(id);
    if (!deletedEpicerie) {
      return res
        .status(404)
        .json({ message: "Aucune épicerie trouvée avec cet ID." });
    }
    res.status(200).json({ message: "Épicerie supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression de l'épicerie." });
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

module.exports = {
  createEpicerie,
  readEpicerie,
  updateEpicerie,
  readEpicerieById,
  deleteEpicerie,
  searchEpicerieByName,
};

const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");
const emailvalidator = require("email-validator");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const dotenv = require("dotenv");

//Géocodage adresse
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json",
      {
        params: {
          address: address,
          key: process.env.MAPS_API,
        },
      }
    );

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      return { latitude, longitude };
    } else {
      throw new Error("No results found for the given address");
    }
  } catch (error) {
    console.error("Error geocoding address:", error.message);
    throw error;
  }
};

// Vérifier le numéro de téléphone
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]\d{9}$/; // Format : 10 chiffres sans préfixe
  return phoneRegex.test(phone);
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rayon.afrique.shop@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

//Inscription

//// Code à 4 chiffres
const generateCode = asyncHandler(async () => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code;
});

const createEpicerie = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  const {
    name,
    mail,
    phone,
    password1,
    password2,
    nameCompany,
    image,
    address,
  } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("nom de l'épicerie");
  if (!phone) missingFields.push("numéro de téléphone");
  if (!password1) missingFields.push("mot de passe");
  if (!password2) missingFields.push("confirmation du mot de passe");
  if (!mail) missingFields.push("adresse e-mail");
  if (!nameCompany) missingFields.push("nom de la société");
  if (!address) missingFields.push("adresse de l'épicerie");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Les champs suivants sont requis: ${missingFields.join(", ")}`,
    });
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
      .select("-password -description -mail -adresse -longitude -latitude -nameCompany")
      .exec();

    if (phoneDuplicate) {
      return res
        .status(409)
        .json({ message: "Numéro de téléphone déjà utilisé." });
    }
    // Check for duplicate mail
    const duplicate = await Epicerie.findOne({ mail })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .select("-password -phone -description -adresse -longitude -latitude -nameCompany")
      .exec();
    if (duplicate) {
      return res.status(409).json({ message: "L'utilisatur existe déjà" });
    }

    if (!emailvalidator.validate(mail)) {
      return res.status(409).json({ message: "L'email n'est pas valide" });
    }

    if (!isValidPhoneNumber(phone)) {
      return res
        .status(409)
        .json({ message: "Le numéro de téléphone n'est pas valide" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password1, 10); // salt rounds

    const maps_adresse = address;

    const coordinates = await geocodeAddress(maps_adresse);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;

    const code = await generateCode();

    // Créer un nouvel utilisateur
    const newEpicerie = new Epicerie({
      name,
      mail,
      phone,
      nameCompany,
      longitude: longitude,
      latitude: latitude,
      image,
      description: "",
      password: hashedPwd,
      adresse: maps_adresse,
      status: "inactif",
      code: code,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newEpicerie.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "rayon.afrique.shop@gmail.com",
      to: ["rayon.afrique.shop@gmail.com", mail],
      subject: "Bienvenue sur notre site",
      html: ` 
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8" />
              <title>Bienvenue</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                }
                h1 {
                  color: #333;
                }
                p {
                  color: #666;
                }
              </style>
            </head>
            <body>
              <h1>Bienvenue sur notre site !</h1>
              <p>Nous sommes ravis de vous accueillir, <strong>${name}</strong>.</p>
              <p>Votre adresse e-mail est : <strong>${mail}</strong></p>
              <p>Votre numéro de téléphone est : <strong>${phone}</strong></p>
              <p>Votre épicerie est : <strong>${nameCompany}</strong></p>
              <p>Votre code de confirmation est : <strong>${code}</strong></p>
              <p>N'hésitez pas à nous contacter si vous avez des questions.</p>
              <p>Cordialement,</p>
              <p>L'équipe de notre site</p>
            </body>
          </html> `,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Inscription réussie. Un e-mail de bienvenue a été envoyé.",
      emailInfo: info,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de l'inscription." });
  }
});

const readEpicerie = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  try {
    const epiceries = await Epicerie.find().select("-password");

    const formattedResult = epiceries.map((epicerie) => ({
      id: epicerie._id,
      name: epicerie.name,
      nameCompany: epicerie.nameCompany,
      phone: epicerie.phone,
      description: epicerie.description,
      adresse: epicerie.adresse,
      latitude: epicerie.latitude,
      latitude: epicerie.longitude,
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
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  try {
    const { id } = req.params;
    const updatedEpicerie = await Epicerie.findByIdAndUpdate(id, req.body, {
      new: true, // Pour retourner l'épicerie mise à jour
    });
    const formattedResult = {
      _id: updatedEpicerie._id,
      name: updatedEpicerie.name,
      nameCompany: updatedEpicerie.nameCompany,
      phone: updatedEpicerie.phone,
      mail: updatedEpicerie.mail,
      image: updatedEpicerie.image,
      description: updatedEpicerie.description,
      adresse: updatedEpicerie.adresse,
      longitude: updatedEpicerie.longitude,
      latitude: updatedEpicerie.latitude
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
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  try {
    const { id } = req.params;
    const epicerie = await Epicerie.findById(id).select("-password");

    if (!epicerie) {
      return res
        .status(404)
        .json({ message: "Aucune épicerie trouvée avec cet ID." });
    }

    const formattedResult = {
      id: epicerie._id,
      name: epicerie.name,
      nameCompany: epicerie.nameCompany,
      phone: epicerie.phone,
      description: epicerie.description,
      adresse: epicerie.adresse,
      latitude: epicerie.latitude,
      latitude: epicerie.longitude,
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

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

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
  
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }
  
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

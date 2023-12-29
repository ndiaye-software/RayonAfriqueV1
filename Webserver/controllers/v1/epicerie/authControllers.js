const Epicerie = require("../../../models/Epicerie"); // Assurez-vous que le chemin vers votre modèle Epicerie est correct
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator");
const phonevalidator = require("validator");
const axios = require('axios');

const geocodeAddress = async (address) => {
  const apiKey = process.env.MAPS_API;
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(apiUrl);
    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return { latitude: location.lat, longitude: location.lng };
    } else {
      throw new Error('Adresse introuvable');
    }
  } catch (error) {
    throw new Error('Erreur lors de la récupération des coordonnées');
  }
};


// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const foundEpicerie = await Epicerie.findOne({ mail }).exec();

    if (!foundEpicerie) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const match = await bcrypt.compare(password, foundEpicerie.password);

    if (!match)
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });

    const accessToken = jwt.sign(
      {
        EpicerieInfo: {
          mail: foundEpicerie.mail,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" } //change 15m before deployment
    );

    const refreshToken = jwt.sign(
      { mail: foundEpicerie.mail },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Créez un cookie sécurisé avec le token de rafraîchissement
    res.cookie("jwt", refreshToken, {
      httpOnly: true, // accessible uniquement par le serveur web
      secure: true, // https
      sameSite: "None", // cookie cross-site
      maxAge: 7 * 24 * 60 * 60 * 1000, // expiration du cookie : réglée pour correspondre au rT
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la connexion." });
  }
};

// @desc Refresh
// @route GET /auth/refresh
// @access Public - car le jeton d'accès a expiré
const refresh = (req, res) => {
  const cookies = req.cookies;

  const { mail } = req.body;

  if (!cookies?.jwt)
    return res.status(401).json({ message: "Non autorisé cookies" });

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
    if (err) return res.status(403).json({ message: "Interdit" });

    const foundEpicerie = await Epicerie.findOne({ mail }).exec();

    if (!foundEpicerie)
      return res.status(401).json({ message: "Non autorisé Epicerie not found" });

    const accessToken = jwt.sign(
      {
        EpicerieInfo: {
          mail: foundEpicerie.mail,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ accessToken });
  });
};

// @desc Logout
// @route POST /auth/logout
// @access Public - juste pour effacer le cookie s'il existe
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // Pas de contenu
  res.clearCookie("jwt", { httpOnly: true, sameSite: "None", secure: true });
  res.json({ message: "Cookie effacé" });
};

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mouhamadoundiaye1290@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

//Inscription
const signUp = asyncHandler(async (req, res) => {
  const { name, mail, phone, password1, password2, nameCompany, image, description, address } = req.body;

  if (!name || !phone || !password1 || !password2 || !mail || !nameCompany || !address) {
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
      .exec();

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

    const coordinates = await geocodeAddress(address);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;

    // Créer un nouvel utilisateur
    const newEpicerie = new Epicerie({
      name,
      mail,
      phone,
      nameCompany,
      longitude : longitude,
      latitude : latitude,
      image,
      description,
      password: hashedPwd,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newEpicerie.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "mouhamadoundiaye1290@gmail.com",
      to: "mouhamadoundiaye1290@gmail.com",
      subject: "Une nouvelle inscription",
      text: `nom : ${name}, mail : ${mail}, phone : ${phone}, epicerie : ${nameCompany}`,
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

module.exports = {
  login,
  refresh,
  logout,
  signUp,
};

const Epicerie = require("../../../models/Epicerie");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator");
const axios = require("axios");

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

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Recherche dans le modèle User
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
        UserInfo: {
          mail: foundEpicerie.mail,
          id: foundEpicerie._id.toString(),
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );

    const refreshToken = jwt.sign(
      {
        UserInfo: {
          mail: foundEpicerie.mail,
          id: foundEpicerie._id.toString(),
        },
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" } // the user does not have to login each day
    );

    // Créez un cookie sécurisé avec le token de rafraîchissement
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({ accessToken });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res
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
      return res
        .status(401)
        .json({ message: "Non autorisé Epicerie not found" });

    const accessToken = jwt.sign(
      {
        EpicerieInfo: {
          mail: foundEpicerie.mail,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
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

const signUp = asyncHandler(async (req, res) => {
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

    if (!isValidPhoneNumber(phone)) {
      return res
        .status(409)
        .json({ message: "Le numéro de téléphone n'est pas valide" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password1, 10); // salt rounds

    const maps_adresse = address.description;

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
      status : "inactif",
      code : code
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newEpicerie.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "rayon.afrique.shop@gmail.com",
      to: "rayon.afrique.shop@gmail.com",
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

//// Vérification mail
const updateEpicerieStatus = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const epicerie = await Epicerie.findOne({ code }).select('-password -phone -description -mail -adresse -longitude -latitude -nameCompany');

  if (!epicerie) {
    return res.status(404).json({ message: "Code invalide" });
  }

  epicerie.status = "actif";
  epicerie.code = undefined;
  await epicerie.save();

  res.json({ message: "Épicerie activée avec succès" });
});


// Réinitialisation de mot de passe

///// générer un jeton de réinitialisation de mot de passe
const generateResetPasswordToken = async (userId) => {
  const payload = {
    userId: userId,
    iat: Date.now() / 1000, // horodatage actuel en secondes
    exp: Date.now() / 1000 + 24 * 60 * 60, // date d'expiration du jeton (24 heures à partir de maintenant)
  };
  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const SendTokenReinitialisation = asyncHandler(async (req, res) => {
  const { mail } = req.body;

  if (!mail) {
    return res.status(400).json({ message: "Le mail est requis" });
  }

  try {
    const epicerie = await Epicerie.findOne({ mail: mail }).select('-password -phone -description -mail -adresse -longitude -latitude -nameCompany');

    if (!epicerie) {
      return res
        .status(404)
        .json({ message: "Ce mail n'est pas attribué à une épicerie" });
    }

    const token_reinitialisation = await generateResetPasswordToken(
      epicerie.id
    );

    epicerie.resetPasswordToken = token_reinitialisation;
    epicerie.resetPasswordExpires = Date.now() + 24 * 60 * 60 * 1000;
    await epicerie.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "rayon.afrique.shop@gmail.com",
      to: "rayon.afrique.shop@gmail.com",
      subject: "Demande de réinitialisation de mot de passe",
      html: `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Réinitialisation de mot de passe</title>
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
            button {
              background-color: #922B21;
              color: white;
              font-weight: bold;
              cursor: pointer;
              border: none;
              padding: 10px 20px;
              border-radius: 5px;
            }
          </style>
        </head>
        <body>
          <h1>Réinitialisation de mot de passe</h1>
          <p>Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.</p>
          <p>Si vous avez effectué cette demande, veuillez cliquer sur le lien ci-dessous pour réinitialiser votre mot de passe :</p>
      
          <p style="text-align: center;">
            <a href='rayonafrique.fr/connexion/reinitialisation-mdp/modification/${epicerie.id}/${token_reinitialisation}' target='_blank' style="background-color: #922B21; color: white; font-weight: bold; cursor: pointer; border: none; padding: 10px 20px; border-radius: 5px; text-decoration: none;">
              Réinitialiser mon mot de passe
            </a>
          </p>
        
          <p>Si vous n'avez pas effectué cette demande, veuillez ignorer cet e-mail. Votre mot de passe actuel reste inchangé.</p>
          <p>Cordialement,</p>
          <p>L'équipe de notre site</p>
        </body>
      </html>
       `,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Demande de réinitialisation envoyée",
      emailInfo: info,
    });
  } catch (error) {
    console.error("Erreur de l'envoi de mail du jeton", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de l'inscription." });
  }
});

const resetPassword = asyncHandler(async (req, res) => {
  const { id, token } = req.params;
  const { password1, password2 } = req.body;

  // Vérifier si le token et l'ID correspondent à une demande de réinitialisation de mot de passe valide
  const epicerie = await Epicerie.findOne({ _id: id, resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } }).select('-password -phone -description -mail -adresse -longitude -latitude -nameCompany');

  if (!epicerie) {
    return res.status(400).json({ message: 'Le token de réinitialisation de mot de passe est invalide ou a expiré.' });
  }

  if (password1 !== password2) {
    return res
      .status(400)
      .json({ message: "Les mots de passe ne sont pas identiques." });
  }

  // Vérifier si le nouveau mot de passe est différent de l'ancien mot de passe
  const isPasswordSame = await bcrypt.compare(password1, epicerie.password);

  if (isPasswordSame) {
    return res.status(400).json({ message: 'Le nouveau mot de passe ne peut pas être le même que l’ancien mot de passe.' });
  }

  // Hasher le nouveau mot de passe
  const hashedPwd = await bcrypt.hash(password1, 10);

  // Mettre à jour le mot de passe de l'épicerie dans la base de données
  epicerie.password = hashedPwd;
  epicerie.resetPasswordToken = undefined;
  epicerie.resetPasswordExpires = undefined;

  await epicerie.save();

  // Envoyer une réponse de succès
  res.status(200).json({ message: 'Votre mot de passe a été réinitialisé avec succès.' });
});

module.exports = {
  login,
  refresh,
  logout,
  signUp,
  SendTokenReinitialisation,
  resetPassword,
  updateEpicerieStatus
};

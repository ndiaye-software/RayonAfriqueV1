const Marque = require("../../../models/Marque");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator");

//Inscription
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rayon.afrique.shop@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

const generateCode = asyncHandler(async () => {
  const code = Math.floor(1000 + Math.random() * 9000);
  return code;
});

const signUp = asyncHandler(async (req, res) => {
  const { name, mail, nameCompany } = req.body;

  const missingFields = [];
  if (!name) missingFields.push("nom de l'épicerie");
  if (!mail) missingFields.push("adresse e-mail");
  if (!nameCompany) missingFields.push("nom de la société");

  if (missingFields.length > 0) {
    return res.status(400).json({
      message: `Les champs suivants sont requis: ${missingFields.join(", ")}`,
    });
  }

  try {
    // Check for duplicate mail
    const duplicate = await Marque.findOne({ mail })
      .collation({ locale: "en", strength: 2 })
      .select(" -nameCompany")
      .lean()
      .exec();

    if (duplicate) {
      return res.status(409).json({ message: "Vous êtes déjà enregistré !" });
    }

    if (!emailvalidator.validate(mail)) {
      return res.status(409).json({ message: "L'email n'est pas valide" });
    }

    const code = await generateCode();

    // Créer un nouvel utilisateur
    const newMarque = new Marque({
      name,
      mail,
      nameCompany,
      status : "inactif",
      code : code
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newMarque.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "rayon.afrique.shop@gmail.com",
      to: ["rayon.afrique.shop@gmail.com", mail],
      subject: "Bienvenue sur notre site - Marque",
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
          <p>Votre marque est : <strong>${nameCompany}</strong></p>
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
const updateMarqueStatus = asyncHandler(async (req, res) => {
  const { code } = req.body;

  const marque = await Marque.findOne({ code }).select('-password -phone -description -mail -adresse -longitude -latitude -nameCompany');

  if (!marque) {
    return res.status(404).json({ message: "Code invalide" });
  }

  marque.status = "actif";
  marque.code = undefined;
  await marque.save();

  res.json({ message: "Marque activée avec succès" });
});


module.exports = {
  signUp,
  updateMarqueStatus
};

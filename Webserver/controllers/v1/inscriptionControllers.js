const nodemailer = require("nodemailer");
const User = require("../../models/Users");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator")
const phonevalidator = require("validator");

// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mouhamadoundiaye1290@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

const signUp = asyncHandler(async (req, res) => {
  const {
    name,
    nameCompany,
    mail,
    phone,
    statut,
    address,
    password1,
    password2,
  } = req.body;

  if (!name || !nameCompany || !phone || !statut || !address || !password1 || !password2 || !mail) {
    return res.status(400).json({ message: 'Tous les champs sont requis' });
}

  try {
    //mot de passe identique
    if (password1 !== password2) {
      return res
        .status(400)
        .json({ message: "Les mots de passe ne sont pas identiques." });
    }

    if (statut !== 1 && statut !== 2) {
      return res
        .status(400)
        .json({ message: "Le statut doit être 1 ou 2 uniquement." });
    }

    const phoneDuplicate = await User.findOne({ phone })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (phoneDuplicate) {
      return res
        .status(409)
        .json({ message: "Numéro de téléphone déjà utilisé." });
    }
    // Check for duplicate mail
    const duplicate = await User.findOne({ mail })
      .collation({ locale: "en", strength: 2 })
      .lean()
      .exec();

    if (duplicate) {
      return res.status(409).json({ message: "L'utilisatur existe déjà" });
    }

    if (!emailvalidator.validate(mail)){
      return res.status(409).json({ message: "L'email n'est pas valide" });
    }

    if (!phonevalidator.isMobilePhone(phone)){
      return res.status(409).json({ message: "Le numéro rentré n'est pas valide" });
    }

    // Hash password
    const hashedPwd = await bcrypt.hash(password1, 10); // salt rounds

    // Créer un nouvel utilisateur
    const newUser = new User({
      name,
      nameCompany,
      mail,
      phone,
      statut,
      address,
      password: hashedPwd,
    });

    // Sauvegarder l'utilisateur dans la base de données
    await newUser.save();

    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: "mouhamadoundiaye1290@gmail.com",
      to: "mouhamadoundiaye1290@gmail.com",
      subject: "Une nouvelle inscription",
      text: `nom : ${name}, \n
             nom de la compagnie : ${nameCompany},\n
             statut : ${statut},\n
             adresse :  ${address},\n
             mail : ${mail} ,\n
             phone : ${phone}`,
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
  signUp,
};

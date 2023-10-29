const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mouhamadoundiaye1290@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

const SendMail = asyncHandler(async (req, res) => {
  const { name, mail, message } = req.body;

  // Vérifier que tous les paramètres requis sont présents
  if (!name || !mail || !message) {
    return res.status(400).json({ error: "N'oubliez de remplir tous les champs !" });
  }

  try {
    // Envoyer un e-mail de bienvenue
    const mailOptions = {
      from: mail,
      to: "mouhamadoundiaye1290@gmail.com",
      subject: "Message",
      text: `mail : ${mail} ,\n
             name : ${name} ,\n
             message : ${message}`,
    };

    const info = await transporter.sendMail(mailOptions);

    res.json({
      message: "Message envoyé",
      emailInfo: info,
    });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de l'envoi du message." });
  }
});

module.exports = {
  SendMail
};

const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");

// Configurer le transporteur nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "rayon.afrique.shop@gmail.com",
    pass: process.env.PASSWORD_EMAIL,
  },
});

//Envoyer un mail à RayonAfrique
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
      to: "rayon.afrique.shop@gmail.com",
      subject: "Prise de contact",
      html: ` 
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Message</title>
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
          <h1>Contact</h1>
          <p><strong>${name}</strong> vous a contacté.</p>
          <p>mail : <strong>${mail}</strong></p>
          <p><strong>${message}</strong></p>
          <p>Cordialement,</p>
          <p>L'équipe de notre site</p>
        </body>
      </html> `,
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

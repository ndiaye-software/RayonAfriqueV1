const mysql = require("mysql2/promise");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator");
const phonevalidator = require("validator");

dotenv.config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// @desc Login
// @route POST /auth
// @access Public
const login = async (req, res) => {
  const { mail, password } = req.body;

  if (!mail || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // Recherche dans la table User
    const [userRows, userFields] = await pool.execute(
      "SELECT * FROM User WHERE mail = ?",
      [mail]
    );

    // Si l'utilisateur n'est pas trouvé dans la table User, recherche dans la table Epicerie
    if (userRows.length === 0) {
      const [epicerieRows, epicerieFields] = await pool.execute(
        "SELECT * FROM Epicerie WHERE mail = ?",
        [mail]
      );

      if (epicerieRows.length === 0) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const match = await bcrypt.compare(password, epicerieRows[0].password);

      if (!match) {
        return res
          .status(401)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const accessToken = jwt.sign(
        {
          UserInfo: {
            mail: epicerieRows[0].mail,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        { mail: epicerieRows[0].mail },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );

      // Créez un cookie sécurisé avec le token de rafraîchissement
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      return res.json({ accessToken });
    }

    const match = await bcrypt.compare(password, userRows[0].password);

    if (!match) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          mail: userRows[0].mail,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { mail: userRows[0].mail },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
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

  if (!cookies?.jwt) {
    return res.status(401).json({ message: "Non autorisé cookies" });
  }

  const refreshToken = cookies.jwt;

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async (err) => {
    if (err) {
      return res.status(403).json({ message: "Interdit" });
    }

    const [userRows, userFields] = await pool.execute(
      "SELECT * FROM User WHERE mail = ?",
      [mail]
    );

    if (userRows.length === 0) {
      return res.status(401).json({ message: "Non autorisé user not found" });
    }

    const accessToken = jwt.sign(
      {
        UserInfo: {
          mail: userRows[0].mail,
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
  if (!cookies?.jwt) {
    return res.sendStatus(204); // Pas de contenu
  }

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
    const { name, mail, phone, password1, password2 } = req.body;
  
    // Liste des champs requis
    const requiredFields = ["name", "mail", "password1", "password2"];
  
    // Vérification si tous les champs requis sont présents
    const missingFields = requiredFields.filter((field) => !req.body[field]);
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Les champs suivants sont requis : ${missingFields.join(", ")}`,
      });
    }
  
    try {
      // Mot de passe identique
      if (password1 !== password2) {
        return res
          .status(400)
          .json({ message: "Les mots de passe ne sont pas identiques." });
      }
  
      // Vérification du numéro de téléphone dupliqué
      const [phoneDuplicateRows, phoneDuplicateFields] = await pool.execute('SELECT * FROM User WHERE phone = ?', [phone]);
  
      if (phoneDuplicateRows.length > 0) {
        return res.status(409).json({ message: "Numéro de téléphone déjà utilisé." });
      }
  
      // Vérification du mail dupliqué
      const [mailDuplicateRows, mailDuplicateFields] = await pool.execute('SELECT * FROM User WHERE mail = ?', [mail]);
  
      if (mailDuplicateRows.length > 0) {
        return res.status(409).json({ message: "L'utilisateur existe déjà." });
      }
  
      // Validation de l'e-mail
      if (!emailvalidator.validate(mail)) {
        return res.status(409).json({ message: "L'e-mail n'est pas valide." });
      }
  
      // Validation du numéro de téléphone
      if (!phonevalidator.isMobilePhone(phone)) {
        return res.status(409).json({ message: "Le numéro rentré n'est pas valide." });
      }
  
      // Hash du mot de passe
      const hashedPwd = await bcrypt.hash(password1, 10); // salt rounds
  
      // Créer un nouvel utilisateur
      const [result, fields] = await pool.execute('INSERT INTO User (name, mail, phone, password) VALUES (?, ?, ?, ?)', [name, mail, phone, hashedPwd]);
  
      // Envoyer un e-mail de bienvenue
      const mailOptions = {
        from: "mouhamadoundiaye1290@gmail.com",
        to: "mouhamadoundiaye1290@gmail.com",
        subject: "Une nouvelle inscription",
        text: `nom : ${name}, mail : ${mail}, phone : ${phone}`,
      };
  
      const info = await transporter.sendMail(mailOptions);
  
      res.json({
        message: "Inscription réussie. Un e-mail de bienvenue a été envoyé.",
        emailInfo: info,
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res.status(500).json({ error: "Une erreur est survenue lors de l'inscription." });
    }
  });
  

module.exports = {
  login,
  refresh,
  logout,
  signUp,
};

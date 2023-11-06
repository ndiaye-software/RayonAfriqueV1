const User = require("../../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const dotenv = require("dotenv");
const emailvalidator = require("email-validator");
const phonevalidator = require("validator");

//Inscription
const createUser = asyncHandler(async (req, res) => {
    const { name, mail, phone, password1, password2 } = req.body;
  
    if (!name || !phone || !password1 || !password2 || !mail) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }
  
    try {
      //mot de passe identique
      if (password1 !== password2) {
        return res
          .status(400)
          .json({ message: "Les mots de passe ne sont pas identiques." });
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
      const newUser = new User({
        name,
        mail,
        phone,
        password: hashedPwd,
      });
  
      // Sauvegarder l'utilisateur dans la base de données
      await newUser.save();
  
      res.json({
        message: "Inscription réussie. Nouvel Utilisateur enregistré"
      });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      res
        .status(500)
        .json({ error: "Une erreur est survenue lors de l'inscription." });
    }
  });

  const readUserById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password -phone -mail');
      if (!user) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des détails de l'utilisateur." });
    }
  });

  const readUser = asyncHandler(async (req, res) => {
    try {
      const user = await User.find().select('-password -phone -mail');
      if (!user) {
        return res.status(404).json({ message: "Utilisateurs non trouvé." });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la récupération des détails de l'utilisateur." });
    }
  });
  
  const updateUser = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, mail, phone, password } = req.body;
      const updatedUser = await User.findByIdAndUpdate(id, { name, mail, phone, password }, { new: true });
      if (!updatedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour de l'utilisateur." });
    }
  });

  const deleteUser = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        return res.status(404).json({ message: "Utilisateur non trouvé." });
      }
      res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
    }
  });

  module.exports = {
    createUser,
    readUser,
    readUserById,
    updateUser,
    deleteUser

  };
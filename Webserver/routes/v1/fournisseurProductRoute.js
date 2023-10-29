const express = require("express");

const {
  createProductFournisseur
} = require("../../controllers/v1/productFournisseurcreationControllers.js");
const router = express.Router();

router.post("/createProductFournisseur/:idUser", createProductFournisseur);

module.exports = router;
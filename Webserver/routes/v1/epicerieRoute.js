const express = require("express");

const {
  getFournisseur, getFournisseurDetail
} = require("../../controllers/v1/epicerieControllers.js");
const router = express.Router();

router.get("/readFournisseur", getFournisseur);
router.get("/readFournisseurDetail/:nameCompany", getFournisseurDetail);

module.exports = router;
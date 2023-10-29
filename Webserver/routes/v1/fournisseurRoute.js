const express = require("express");

const {
  getEpicerie, getEpicerieDetail
} = require("../../controllers/v1/fournisseurControllers.js");
const router = express.Router();

router.get("/readEpicerie", getEpicerie);
router.get("/readEpicerieDetail/:nameCompany", getEpicerieDetail);

module.exports = router;
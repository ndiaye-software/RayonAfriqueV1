const express = require("express");
const {
  createCountryName,
  getCountryList,
  updateCountry,
  deleteCountry
} = require("../../controllers/v1/countryControllers.js");
const router = express.Router();

router.post("/create", createCountryName);
router.get("/read", getCountryList);
router.patch("/update/:id", updateCountry);
router.delete("/delete/:id", deleteCountry);

module.exports = router;

const express = require("express");

const {
  createCountry,
  readCountry,
  updateCountry,
  deleteCountry,
} = require("../../../controllers/v1/admin/countryControllers");

const router = express.Router();

router.post("/create", createCountry);
router.get("/read", readCountry);
router.patch("/update/:id", updateCountry);
router.delete("/delete/:id", deleteCountry);

module.exports = router;

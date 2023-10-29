const express = require("express");
const {
  readCountry,
} = require("../../../controllers/v1/user/countryControllers");
const router = express.Router();

router.get("/read", readCountry);

module.exports = router;
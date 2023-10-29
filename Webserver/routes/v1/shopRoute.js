const express = require("express");

const {
  getGroceryProducts
} = require("../../controllers/v1/shopControllers.js");
const router = express.Router();

router.get("/read", getGroceryProducts);

module.exports = router;

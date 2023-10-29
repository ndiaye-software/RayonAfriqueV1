const express = require("express");

const {
  getGroceryByProduct
} = require("../../controllers/v1/shopDetailControllers.js");
const router = express.Router();

router.get("/read/:idProduct", getGroceryByProduct);

module.exports = router;

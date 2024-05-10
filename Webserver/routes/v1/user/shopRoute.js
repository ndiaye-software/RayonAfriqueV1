const express = require("express");

const {
  getGroceryProducts,
  getGroceryByProduct,
} = require("../../../controllers/v1/user/shopControllers");

const router = express.Router();

router.post("/grocery/:name", getGroceryByProduct)
router.get("/read", getGroceryProducts);

module.exports = router;
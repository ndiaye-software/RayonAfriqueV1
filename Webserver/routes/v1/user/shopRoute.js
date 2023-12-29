const express = require("express");

const {
  getGroceryByProductByPosition,
  getGroceryProducts,
  getGroceryByProduct,
  searchProduct
} = require("../../../controllers/v1/user/shopControllers");

const router = express.Router();

router.get("/grocery/:name", getGroceryByProduct)
router.get("/read", getGroceryProducts);
router.post("/product", searchProduct);
router.get("/product/:name/:position", getGroceryByProductByPosition);

module.exports = router;
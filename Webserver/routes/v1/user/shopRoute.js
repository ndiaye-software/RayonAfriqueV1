const express = require("express");

const {
  getGroceryByProduct,
  getGroceryByProductByPosition,
  getGroceryProducts,
  searchProduct
} = require("../../../controllers/v1/user/shopControllers");

const router = express.Router();

router.get("/product", getGroceryProducts);
router.post("/product", searchProduct);
router.get("/epicerie/product/:name", getGroceryByProduct);
router.get("/epicerie/product/:name/:position", getGroceryByProductByPosition);

module.exports = router;
const express = require("express");

const {
  getGroceryProducts,
  getGroceryByProduct,
  sendSuggestion,
} = require("../../../controllers/v1/user/shopControllers");

const router = express.Router();

router.post("/grocery/:name", getGroceryByProduct)
router.get("/read", getGroceryProducts);
router.post("/suggestion", sendSuggestion);

module.exports = router;
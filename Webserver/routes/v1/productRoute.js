const express = require("express");

const {
  getProductList,
  createProductName,
  updateProduct,
  deleteProduct,
  getProductsByReference,
} = require("../../controllers/v1/productControllers.js");
const router = express.Router();

router.post("/create", createProductName);
router.get("/read", getProductList);
router.get("/search/:reference", getProductsByReference);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);

module.exports = router;

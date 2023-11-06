const express = require("express");
const {
  saveProduct,
  getSavedProducts,
  deleteCart,
  deleteProductCart
} = require("../../../controllers/v1/user/cartControllers");
const router = express.Router();

router.post("/create", saveProduct);
router.get("/read/:idUser", getSavedProducts);
router.delete("/delete/:idUser", deleteCart);
router.delete("/deleteProduct/:idUser/:idProduct", deleteProductCart);

module.exports = router;

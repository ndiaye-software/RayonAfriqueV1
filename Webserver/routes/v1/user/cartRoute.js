const express = require("express");
const {
  saveProduct,
  getSavedProducts
} = require("../../../controllers/v1/user/cartControllers");
const router = express.Router();

router.post("/create", saveProduct);
router.get("/read/:idUser", getSavedProducts);

module.exports = router;

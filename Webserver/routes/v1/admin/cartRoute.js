const express = require("express");
const {
  countSavedProducts,
  listSavedProductsWithCount
} = require("../../../controllers/v1/admin/cartControllers");
const router = express.Router();

router.get("/count", countSavedProducts);
router.get("/list", listSavedProductsWithCount);
module.exports = router;

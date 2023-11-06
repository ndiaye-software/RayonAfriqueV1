const express = require("express");
const {
  countSavedProducts,
  listSavedProductsWithCount,
  countProduct,
  countEpicerie,
  countUser
} = require("../../../controllers/v1/admin/kpiControllers");
const router = express.Router();

router.get("/countEpicerie", countEpicerie);
router.get("/countUser", countUser);
router.get("/countCart", countSavedProducts);
router.get("/countProduct", countProduct);
router.get("/list", listSavedProductsWithCount);
module.exports = router;

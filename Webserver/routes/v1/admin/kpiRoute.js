const express = require("express");
const {
  countProduct,
  countEpicerie,
  countEpicerieProduct
} = require("../../../controllers/v1/admin/kpiControllers");
const router = express.Router();

router.get("/countEpicerie", countEpicerie);
router.get("/countProduct", countProduct);
router.get("/countEpicerieProduct", countEpicerieProduct);
module.exports = router;

const express = require("express");

const { getBrands, deleteBrand, createBrandProduct, updateBrand } = require("../../controllers/v1/brandsControllers");
const router = express.Router();

router.get("/brands", getBrands);
router.post("/add", createBrandProduct);
router.delete("/delete", deleteBrand);
router.patch("/update", updateBrand)

module.exports = router;

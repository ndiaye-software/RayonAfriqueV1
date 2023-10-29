const express = require("express");
const {
  createCategoryProduct,
  getCategoryList,
  updateCategory,
  deleteCategory,
} = require("../../controllers/v1/categoryProductControllers");
const router = express.Router();

router.post("/create", createCategoryProduct);
router.get("/read", getCategoryList);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;

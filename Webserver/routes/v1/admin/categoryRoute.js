const express = require("express");

const {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory,
} = require("../../../controllers/v1/admin/categoryControllers");

const router = express.Router();

router.post("/create", createCategory);
router.get("/read", readCategory);
router.patch("/update/:id", updateCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;

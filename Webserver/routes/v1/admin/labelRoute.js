const express = require("express");

const {
  createLabel,
  readLabel,
  updateLabel,
  deleteLabel,
} = require("../../../controllers/v1/admin/labelControllers");

const router = express.Router();

router.post("/create", createLabel);
router.get("/read", readLabel);
router.patch("/update/:id", updateLabel);
router.delete("/delete/:id", deleteLabel);

module.exports = router;

const express = require("express");

const {
  createLabel,
  readLabel,
} = require("../../../controllers/v1/epicerie/labelControllers");

const router = express.Router();

router.post("/create", createLabel);
router.get("/read", readLabel);

module.exports = router;

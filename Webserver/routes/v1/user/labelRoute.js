const express = require("express");

const {
  readLabel,
} = require("../../../controllers/v1/user/labelControllers");

const router = express.Router();

router.get("/read", readLabel);

module.exports = router;

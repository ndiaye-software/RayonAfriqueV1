const express = require("express");
const {
  readCategory,
} = require("../../../controllers/v1/user/categoryControllers");
const router = express.Router();

router.get("/read", readCategory);

module.exports = router;

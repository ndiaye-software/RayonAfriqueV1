const express = require("express");

const {
  signUp
} = require("../../controllers/v1/inscriptionControllers.js");
const router = express.Router();

router.post("/signUp", signUp);

module.exports = router;
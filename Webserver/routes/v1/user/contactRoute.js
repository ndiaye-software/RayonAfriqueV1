const express = require("express");

const {
  SendMail
} = require("../../../controllers/v1/user/contactControllers.js");
const router = express.Router();

router.post("/send", SendMail);

module.exports = router;
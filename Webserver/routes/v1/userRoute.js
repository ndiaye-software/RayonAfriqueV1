const express = require("express");
const validate = require("../../middleware/validators/validate");
const AuthValidator = require("../../middleware/validators/AuthValidator");

const {
  getUserList,
  updateUser,
  deleteUser,
  readUser,
} = require("../../controllers/v1/userControllers.js");
const router = express.Router();

router.get("/read", getUserList);
router.get("/readUser/:idUser", readUser);
router.patch("/update/:idUser", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

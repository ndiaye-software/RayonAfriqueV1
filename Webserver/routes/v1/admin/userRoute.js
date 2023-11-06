const express = require("express");

const {
  readUser,
  readUserById,
  createUser,
  updateUser,
  deleteUser
} = require("../../../controllers/v1/admin/userControllers");

const router = express.Router();

router.post("/create", createUser);
router.get("/read", readUser);
router.get("/read/:id", readUserById);
router.patch("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

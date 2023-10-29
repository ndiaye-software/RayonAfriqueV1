const express = require("express");

const { getProductUserList, createProductUserName, updateProductUser, deleteProductUser, readProductByUser } = require("../../controllers/v1/productUserControllers.js");
const router = express.Router();


router.post("/create", createProductUserName);
router.get("/read", getProductUserList);
router.patch("/update/:id", updateProductUser);
router.delete("/delete/:id", deleteProductUser);
router.get("/readUser/:idUser", readProductByUser);

module.exports = router;
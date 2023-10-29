const express = require("express");

const { getMarketProductDetailFournisseur, getMarketProduct, getMarketProductDetailEpicerie } = require("../../controllers/v1/marketControllers.js");
const router = express.Router();


router.get("/readMarketDetailFournisseur/:idproductUser", getMarketProductDetailFournisseur);
router.get("/readMarketDetailEpicerie/:idproductUser", getMarketProductDetailEpicerie);
router.get("/readMarket", getMarketProduct);

module.exports = router;
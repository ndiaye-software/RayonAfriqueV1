const mongoose = require("mongoose");
const EpicerieProduct = require("./EpicerieProduct.js");

const cartSchema = new mongoose.Schema({
  idEpicerieProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EpicerieProduct",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

const mongoose = require("mongoose");
const EpicerieProduct = require("./EpicerieProduct.js");
const User = require("./User.js");

const cartSchema = new mongoose.Schema({
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  idEpicerieProduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "EpicerieProduct",
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;

const mongoose = require("mongoose");
const User = require("./Users.js");
const Product = require("./Product.js");
const productUserSchema = new mongoose.Schema({
  idproduct: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  iduser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  available: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
});

const ProductUser = mongoose.model("ProductUser", productUserSchema);

module.exports = ProductUser;

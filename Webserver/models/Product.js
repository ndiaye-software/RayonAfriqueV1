const mongoose = require("mongoose");
const CountryProducts = require("./CountryProducts.js");
const CategoryProducts = require("./CategoryProducts");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reference: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryProducts",
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CountryProducts",
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

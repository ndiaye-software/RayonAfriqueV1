const mongoose = require("mongoose");
const Country = require("./Country.js");
const Category = require("./Category.js");
const Label = require("./Label.js");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reference: {
    type: String,
    unique: true,
  },
  ingredients: {
    type: String,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Country",
    required: true,
  },
  label: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Label",
    required: true,
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;

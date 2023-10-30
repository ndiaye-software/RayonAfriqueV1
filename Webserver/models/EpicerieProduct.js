const mongoose = require("mongoose");
const Epicerie = require("./Epicerie.js");
const CountryProducts = require("./Country.js");
const CategoryProducts = require("./Category.js");

const epicerieProductSchema = new mongoose.Schema({
  idEpicerie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Epicerie",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  reference: {
    type: String,
    unique: true,
  },
  price: {
    type: String,
    required: true,
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
  available: {
    type: Boolean,
    required: true,
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

const EpicerieProduct = mongoose.model("EpicerieProduct", epicerieProductSchema);

module.exports = EpicerieProduct;

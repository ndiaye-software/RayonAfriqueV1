const mongoose = require("mongoose");
const Epicerie = require("./Epicerie.js");
const Country = require("./Country.js");
const Category = require("./Category.js");
const Label = require("./Label.js");

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

const EpicerieProduct = mongoose.model("EpicerieProduct", epicerieProductSchema);

module.exports = EpicerieProduct;

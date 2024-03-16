const mongoose = require("mongoose");
const Epicerie = require("./Epicerie.js");
const Product = require("./Product.js");

const epicerieProductSchema = new mongoose.Schema(
  {
    idEpicerie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Epicerie",
      required: true,
    },
    idProduct: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
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
  }
);

epicerieProductSchema.index({ idEpicerie: 1, idProduct: 1 }, { unique: true });

const EpicerieProduct = mongoose.model(
  "EpicerieProduct",
  epicerieProductSchema
);

module.exports = EpicerieProduct;

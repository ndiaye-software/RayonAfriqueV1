const mongoose = require("mongoose");

const marqueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  nameCompany: {
    type: String,
    required: true,
  }
});

const Marque = mongoose.model("Marque", marqueSchema);

module.exports = Marque;

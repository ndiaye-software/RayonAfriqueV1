const mongoose = require("mongoose");

const countryProductsSchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
    unique: true,
  },
});

const CountryProducts = mongoose.model(
  "CountryProducts",
  countryProductsSchema
);

module.exports = CountryProducts;

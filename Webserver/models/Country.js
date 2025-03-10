const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  countryName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Country = mongoose.model(
  "Country",
  countrySchema
);

module.exports = Country;

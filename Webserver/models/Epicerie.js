const mongoose = require("mongoose");

const epicerieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nameCompany: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  adresse: {
    type: String,
    required: true,
  },
  latitude: {
    type: Number,
    required: true,
  },
  longitude: {
    type: Number,
    required: true,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  code: {
    type: String,
  },
  status: {
    type: String,
  },
});

const Epicerie = mongoose.model("Epicerie", epicerieSchema);

module.exports = Epicerie;

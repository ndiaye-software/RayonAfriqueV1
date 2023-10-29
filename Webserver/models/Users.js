const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
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
  address: {
    type: String,
    required: true,
  },
  statut: {
    type: Number,
    required: true,
    validate: {
      validator: function (value) {
        return value === 1 || value === 2;
      },
      message: "Le champ 'statut' doit être 1 ou 2 uniquement.",
    },
  },
  nameCompany: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model("User", userSchema);

module.exports = Users;

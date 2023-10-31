const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema({
  labelName: {
    type: String,
    required: true,
    unique: true,
  },
});

const Label = mongoose.model(
  "Label",
  labelSchema
);

module.exports = Label;

const mongoose = require("mongoose");

const categoryProductsSchema = new mongoose.Schema({
  nameCategory: {
    type: String,
    required: true,
    unique: true,
  },
});

const CategoryProducts = mongoose.model(
  "CategoryProducts",
  categoryProductsSchema
);

module.exports = CategoryProducts;

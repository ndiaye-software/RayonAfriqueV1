const Category = require("../../../models/Category");
const asyncHandler = require("express-async-handler");

//Lister les catégories
const readCategory = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des catégories",
    });
  }
});

module.exports = {
  readCategory,
};

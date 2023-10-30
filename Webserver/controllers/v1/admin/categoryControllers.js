const Category = require("../../../models/Category");
const asyncHandler = require("express-async-handler");

//Créer une catégorie
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { categoryName } = req.body;

    const newCategoryProduct = new Category({
      categoryName,
    });

    const savedCategoryProduct = await newCategoryProduct.save();

    res.status(201).json(savedCategoryProduct);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du CategoryProduct",
    });
  }
});

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

//Modifier une catégorie à travers son :id
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const { categoryName } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  // Does the category exist to update?
  const category = await Category.findById(id).exec();

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  // Check for duplicate
  const duplicate = await Category.findOne({ categoryName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original category
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate category" });
  }

  // Update the category's categoryName property
  category.categoryName = categoryName;

  const updatedCategory = await category.save();

  res.json({ message: `${updatedCategory.categoryName} updated` });
});

//Supprimer une catégorie à travers son :id
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "category ID Required" });
  }

  // Does the user exist to delete?
  const categoryName = await Category.findById(id).exec();

  if (!categoryName) {
    return res.status(400).json({ message: "category not found" });
  }

  const result = await categoryName.deleteOne();

  const reply = `category ${result.categoryName} with ID ${result._id} deleted`

  res.json(reply);
});

module.exports = {
  createCategory,
  readCategory,
  updateCategory,
  deleteCategory
};

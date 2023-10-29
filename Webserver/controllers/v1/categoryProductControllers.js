const CategoryProducts = require("../../models/CategoryProducts");
const asyncHandler = require("express-async-handler");

const createCategoryProduct = asyncHandler(async (req, res) => {
  try {
    const { nameCategory } = req.body;

    const newCategoryProduct = new CategoryProducts({
      nameCategory,
    });

    const savedCategoryProduct = await newCategoryProduct.save();

    res.status(201).json(savedCategoryProduct);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du CategoryProduct",
    });
  }
});

const getCategoryList = asyncHandler(async (req, res) => {
  try {
    const categories = await CategoryProducts.find();

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des catégories",
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const { nameCategory } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  // Does the category exist to update?
  const category = await CategoryProducts.findById(id).exec();

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  // Check for duplicate
  const duplicate = await CategoryProducts.findOne({ nameCategory })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original category
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate category" });
  }

  // Update the category's nameCategory property
  category.nameCategory = nameCategory;

  const updatedCategory = await category.save();

  res.json({ message: `${updatedCategory.nameCategory} updated` });
});


const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Brand ID Required" });
  }

  // Does the user exist to delete?
  const nameCategory = await CategoryProducts.findById(id).exec();

  if (!nameCategory) {
    return res.status(400).json({ message: "Brand not found" });
  }

  const result = await nameCategory.deleteOne();

  const reply = `brand ${result.nameCategory} with ID ${result._id} deleted`

  res.json(reply);
});

module.exports = {
  createCategoryProduct,
  getCategoryList,
  updateCategory,
  deleteCategory
};

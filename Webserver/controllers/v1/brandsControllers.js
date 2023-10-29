const Brand = require("../../models/Brands");
const asyncHandler = require("express-async-handler");

const getBrands = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find();
    res.status(200).json(brands);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des marques",
    });
  }
});

const createBrandProduct = asyncHandler(async (req, res) => {
  try {
    const { brand } = req.body;

    const newBrandProduct = new Brand({
      brand,
    });

    const savedBrandProduct = await newBrandProduct.save();

    res.status(201).json(savedBrandProduct);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du BrandProduct",
    });
  }
});

const updateBrand = asyncHandler(async (req, res) => {
  const { nameCompany } = req.body;

  // Confirm data
  if (!nameCompany) {
    return res.status(400).json({ message: "nameCompany is required" });
  }

  // Does the user exist to update?
  const brand = await Brand.find(brand).exec();

  if (!brand) {
    return res.status(400).json({ message: "Brand not found" });
  }

  // Check for duplicate
  const duplicate = await Users.findOne({ nameCompany })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original user
  if (duplicate && duplicate?.nameCompany !== nameCompany) {
    return res.status(409).json({ message: "Duplicate brand" });
  }

  brand.nameCompany = nameCompany;

  const updatedBrand = await brand.save();

  res.json({ message: `${updatedBrand.nameCompany} updated` });
});

const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Brand ID Required" });
  }

  // Does the user exist to delete?
  const brand = await Brand.findById(id).exec();

  if (!brand) {
    return res.status(400).json({ message: "Brand not found" });
  }

  const result = await brand.deleteOne();

  const reply = `brand ${result.brand} with ID ${result._id} deleted`

  res.json(reply);
});

module.exports = {
  getBrands,
  createBrandProduct,
  updateBrand,
  deleteBrand,
};

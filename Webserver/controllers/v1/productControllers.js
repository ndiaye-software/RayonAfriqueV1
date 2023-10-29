const Product = require("../../models/Product");
const asyncHandler = require("express-async-handler");

const createProductName = asyncHandler(async (req, res) => {
  try {
    const { name, reference, category, country } = req.body;

    const newProduct = new Product({
      name,
      reference,
      category,
      country
    });
    const savednewProduct = await newProduct.save();
    res.status(201).json(savednewProduct);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du produit",
    });
  }
});
const getProductsByReference = asyncHandler(async (req, res) => {
  try {
    const { reference } = req.params;

    // Recherchez les produits ayant la même référence
    const products = await Product.find({ reference });

    // Vérifiez si des produits ont été trouvés
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "Aucun produit trouvé avec cette référence." });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération des produits par référence.",
    });
  }
});

const getProductList = asyncHandler(async (req, res) => {
  try {
    const product = await Product.find();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des product",
    });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, category, country} = req.body;

  // Confirm data
  if (!id || !name) {
    return res.status(400).json({ message: "ID and name required" });
  }

  // Does the company exist to update?
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "product not found" });
  }

  // Check for duplicate
  const duplicate = await Product.findOne({ product })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original company
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate product" });
  }

  if (name) {
    product.name = name;
  }

  if (category) {
    product.category = category;
  }

  if (country) {
    product.country = country;
  }

  const updatedProduct = await product.save();

  res.json({ message: `${updatedProduct.name} updated` });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Product ID Required" });
  }

  // Does the companyStatus exist to delete?
  const product = await Product.findById(id).exec();

  if (!product) {
    return res.status(400).json({ message: "CompanyStatus not found" });
  }

  const result = await product.deleteOne();

  const reply = `brand ${result.name} with ID ${result._id} deleted`;

  res.json(reply);
});

module.exports = {
  createProductName,
  getProductList,
  updateProduct,
  deleteProduct,
  getProductsByReference,
};

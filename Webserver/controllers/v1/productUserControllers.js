const ProductUser = require("../../models/ProductUser");
const asyncHandler = require("express-async-handler");
const Product = require("../../models/Product");


const createProductUserName = asyncHandler (async (req, res) => {
  try {
    const { idproduct, iduser, price, available } = req.body;

    const newProductUser = new ProductUser({
        idproduct, iduser, price, available
    });
    const savednewProductUser = await newProductUser.save();
    res.status(201).json(savednewProductUser);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du produit",
    });
  }
});

const getProductUserList = asyncHandler (async (req, res) => {
  try {
    const product = await ProductUser.find();

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des productUser",
    });
  }
});

const updateProductUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  const { iduser, price, available } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "ID required" });
  }

  // Does the company exist to update?
  const productUser = await ProductUser.findById(id).exec();

  if (!productUser) {
    return res.status(400).json({ message: "productUser not found" });
  }

  // Check for duplicate
  const duplicate = await ProductUser.findOne({ productUser })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original company
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate productUser" });
  }
  if (iduser) {
    productUser.iduser = iduser;
  }

  if (price) {
    productUser.price = price;
  }

  if (available) {
    productUser.available = available;
  }

  const updatedProductUser= await productUser.save();

  res.json({ message: `${updatedProductUser.idproduct} updated` });
});

const deleteProductUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ProductUser ID Required" });
  }

  const productUser = await ProductUser.findById(id).exec();

  if (!productUser) {
    return res.status(400).json({ message: "ProductUser not found" });
  }

  const result = await productUser.deleteOne();

  const reply = `brand ${result.idproduct} with ID ${result._id} deleted`;

  res.json(reply);
});

const readProductByUser = asyncHandler(async (req, res) => {
  try {
    const productsData = await ProductUser.find({ iduser: req.params.idUser });
    const products = await Promise.all(
      productsData.map(async (productData) => {
        const product = await Product.findById(productData.idproduct)
          .populate("category", "nameCategory")
          .lean();

        return {
          name: product.name,
          category: product.category.nameCategory,
          price: productData.price,
          available: productData.available,
          description: product.description
        };
      })
    );

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la récupération des produits de l'utilisateur." });
  }
});

module.exports = {
  createProductUserName,
  getProductUserList,
  updateProductUser,
  deleteProductUser,
  readProductByUser,
};

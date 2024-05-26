const Country = require("../../../models/Country");
const asyncHandler = require("express-async-handler");
const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");

//Créer un pays
const createCountry = asyncHandler (async (req, res) => {
  
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }


  try {
    const { countryName } = req.body;

    const newcountryName = new Country({
      countryName,
    });
    const savednewcountryName = await newcountryName.save();
    res.status(201).json(savednewcountryName);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du CountryProduct",
    });
  }
});

//Lister les pays créés
const readCountry = asyncHandler (async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }


  try {
    const countries = await Country.find();

    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des countries",
    });
  }
});

//Modifier un pays
const updateCountry = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }


  const { id } = req.params;
  
  const { countryName } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  // Does the country exist to update?
  const country = await Country.findById(id).exec();

  if (!country) {
    return res.status(400).json({ message: "country not found" });
  }

  // Check for duplicate
  const duplicate = await Country.findOne({ countryName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original country
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate country" });
  }

  // Update the country's countryName property
  country.countryName = countryName;

  const updatedCountry = await country.save();

  res.json({ message: `${updatedCountry.countryName} updated` });
});

//Supprimer un pays
const deleteCountry = asyncHandler(async (req, res) => {

  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const userId = decodedToken.UserInfo.id;
  const admin = await Admin.findById(userId).select("-password -phone -mail");

  if (!admin) {
    return res.status(404).json({ message: "Access Denied" });
  }

  const { id } = req.params;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Country ID Required" });
  }

  // Does the user exist to delete?
  const countryName = await Country.findById(id).exec();

  if (!countryName) {
    return res.status(400).json({ message: "country not found" });
  }

  const result = await countryName.deleteOne();

  const reply = `country ${result.countryName} with ID ${result._id} deleted`

  res.json(reply);
});


module.exports = {
  createCountry,
  readCountry,
  updateCountry,
  deleteCountry
};

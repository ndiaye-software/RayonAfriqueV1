const Label = require("../../../models/Label");
const asyncHandler = require("express-async-handler");
const Admin = require("../../../models/Admin");
const jwt = require("jsonwebtoken");

//Créer un pays
const createLabel = asyncHandler (async (req, res) => {
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
    const { labelName } = req.body;

    const newlabelName = new Label({
      labelName,
    });
    const savednewlabelName = await newlabelName.save();
    res.status(201).json(savednewlabelName);
  } catch (error) {
    res.status(500).json({
      error: "Une erreur est survenue lors de la création du labelProduct",
    });
  }
});

//Lister les pays créés
const readLabel = asyncHandler (async (req, res) => {
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
    const labels = await Label.find();

    res.status(200).json(labels);
  } catch (error) {
    res.status(500).json({
      error:
        "Une erreur est survenue lors de la récupération de la liste des labels",
    });
  }
});

//Modifier un pays
const updateLabel = asyncHandler(async (req, res) => {
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
  
  const { labelName } = req.body;

  // Confirm data
  if (!id) {
    return res.status(400).json({ message: "Category id is required" });
  }

  // Does the label exist to update?
  const label = await Label.findById(id).exec();

  if (!label) {
    return res.status(400).json({ message: "label not found" });
  }

  // Check for duplicate
  const duplicate = await Label.findOne({ labelName })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow updates to the original label
  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate label" });
  }

  // Update the label's labelName property
  label.labelName = labelName;

  const updatedLabel = await label.save();

  res.json({ message: `${updatedLabel.labelName} updated` });
});

//Supprimer un pays
const deleteLabel = asyncHandler(async (req, res) => {

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
    return res.status(400).json({ message: "label ID Required" });
  }

  // Does the user exist to delete?
  const labelName = await Label.findById(id).exec();

  if (!labelName) {
    return res.status(400).json({ message: "label not found" });
  }

  const result = await labelName.deleteOne();

  const reply = `label ${result.labelName} with ID ${result._id} deleted`

  res.json(reply);
});


module.exports = {
  createLabel,
  readLabel,
  updateLabel,
  deleteLabel
};

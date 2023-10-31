const Label = require("../../../models/Label");
const asyncHandler = require("express-async-handler");

//Créer un pays
const createLabel = asyncHandler (async (req, res) => {
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


module.exports = {
  createLabel,
  readLabel,
};

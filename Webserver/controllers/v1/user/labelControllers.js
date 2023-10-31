const Label = require("../../../models/Label");
const asyncHandler = require("express-async-handler");

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
  readLabel,
};

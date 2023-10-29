const Country = require("../../../models/Country");
const asyncHandler = require("express-async-handler");

//Lister les pays créés
const readCountry = asyncHandler (async (req, res) => {
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


module.exports = {
  readCountry
};

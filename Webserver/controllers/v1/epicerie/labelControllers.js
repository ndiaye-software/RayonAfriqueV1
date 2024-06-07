const Label = require("../../../models/Label");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const Epicerie = require("../../../models/Epicerie");

//Créer un pays
const createLabel = asyncHandler (async (req, res) => {
  try {

    if (!req.headers.authorization) {
      res.status(402).json({ error: "Authorization header missing" });
      return;
    }
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const decodedToken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const userId = decodedToken.UserInfo.id;
    const epicerie = await Epicerie.findById(userId).select('-password -phone -description -mail -adresse -longitude -latitude -nameCompany');
    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvé." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

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

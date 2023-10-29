const Users = require('../../models/Users');
const asyncHandler = require('express-async-handler');

// Charger les épiceries
const getEpicerie = asyncHandler( async (req, res) => {
  try {
    const epiceries = await Users.find({ statut: 1 }); // Récupérer les épiceries (statut=1)
    res.json(epiceries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Charger les détails des épiceries
const getEpicerieDetail = asyncHandler( async (req, res) => {
  const nameCompany = req.params.nameCompany;

  try {
    const epicerie = await Users.findOne({  nameCompany }); // Rechercher l'épicerie par ID

    if (!epicerie) {
      return res.status(404).json({ message: 'Épicerie non trouvée.' });
    }

    const epicerieDetails = {
      image: epicerie.image,
      name: epicerie.name,
      mail: epicerie.mail,
      description: epicerie.description,
    };
    res.json(epicerieDetails);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = {
    getEpicerie,
    getEpicerieDetail
  };
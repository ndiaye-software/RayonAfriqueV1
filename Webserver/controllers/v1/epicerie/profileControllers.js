const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const emailvalidator = require("email-validator");
const axios = require('axios');

// Géocodage adresse
const geocodeAddress = async (address) => {
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: address,
        key: process.env.MAPS_API,
      },
    });

    if (response.data.results && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      const latitude = location.lat;
      const longitude = location.lng;

      return { latitude, longitude };
    } else {
      throw new Error('No results found for the given address');
    }
  } catch (error) {
    console.error('Error geocoding address:', error.message);
    throw error;
  }
}

// Vérifier le numéro de téléphone
const isValidPhoneNumber = (phone) => {
  const phoneRegex = /^[0-9]\d{9}$/; // Format : 10 chiffres sans préfixe
  return phoneRegex.test(phone);
};

//Lire le profil d'une épicerie
const readProfile = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const idEpicerie = decodedToken.UserInfo.id;

  try {
    const epicerie = await Epicerie.findById(idEpicerie).select('-password -_id');

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvée." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }

    // Si l'épicerie est trouvée et que le compte correspond, renvoyez ses informations au client
    res.status(200).json(epicerie);
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur au client
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur lors de la lecture du profil de l'épicerie." });
  }
});

//Modifier le profil d'une épicerie
const updateProfile = asyncHandler(async (req, res) => {
  if (!req.headers.authorization) {
    res.status(402).json({ error: "Authorization header missing" });
    return;
  }

  const accessToken = req.headers.authorization.replace("Bearer ", "");
  const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
  const idEpicerie = decodedToken.UserInfo.id;

  try {
    const epicerie = await Epicerie.findById(idEpicerie).select('-password');

    if (!epicerie) {
      return res.status(404).json({ error: "Epicerie non trouvée." });
    }

    if (epicerie.status == "inactif") {
      return res.status(404).json({ message: "Veuillez activez votre compte" });
    }
    
    const {
      name,
      mail,
      nameCompany,
      description,
      phone,
      adresse,
      image
    } = req.body;

    if (mail) {
      if (!emailvalidator.validate(mail)) {
        return res.status(409).json({ message: "L'email n'est pas valide" });
      }
      epicerie.mail = mail;
    }

    if (phone) {
      if (!isValidPhoneNumber(phone)) {
        return res.status(409).json({ message: "Le numéro de téléphone n'est pas valide" });
      }
      epicerie.phone = phone;
    }

    if (name) {
      epicerie.name = name;
    }

    if (nameCompany) {
      epicerie.nameCompany = nameCompany;
    }

    if (image) {
      epicerie.image = image;
    }

    if (description) {
      epicerie.description = description;
    }

    if (adresse) {
      epicerie.adresse = adresse;
    }

    const maps_adresse = adresse;
    const coordinates = await geocodeAddress(maps_adresse);
    const latitude = coordinates.latitude;
    const longitude = coordinates.longitude;

    if (adresse) {
      epicerie.latitude = latitude;
    }

    if (adresse) {
      epicerie.longitude = longitude;
    }

    // Sauvegardez les modifications dans la base de données
    await epicerie.save();
    res
      .status(200)
      .json({ message: "Profil d'épicerie mis à jour avec succès." });
  } catch (error) {
    // En cas d'erreur, renvoyez une réponse d'erreur au client
    console.error(error);
    res
      .status(500)
      .json({
        error: "Erreur lors de la mise à jour du profil de l'épicerie.",
      });
  }
});


module.exports = {
  readProfile,
  updateProfile,
};

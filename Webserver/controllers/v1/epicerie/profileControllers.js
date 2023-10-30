const Epicerie = require("../../../models/Epicerie");
const asyncHandler = require("express-async-handler");

//Lire le profil d'une épicerie
const readProfile = asyncHandler(async (req, res) => {
    try {
      const { idEpicerie } = req.params; // Obtenez l'ID de l'épicerie à partir des paramètres de la requête
  
      // Recherchez l'épicerie dans la base de données en utilisant son ID
      const epicerie = await Epicerie.findById(idEpicerie).select('name mail nameCompany image description phone');;
  
      if (!epicerie) {
        // Si l'épicerie n'est pas trouvée, renvoyez une réponse appropriée
        return res.status(404).json({ message: "Épicerie non trouvée." });
      }
  
      // Si l'épicerie est trouvée et que le compte correspond, renvoyez ses informations au client
      res.status(200).json(epicerie);
    } catch (error) {
      // En cas d'erreur, renvoyez une réponse d'erreur au client
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la lecture du profil de l'épicerie." });
    }
  });
  

//Modifier le profil d'une épicerie
const updateProfile = asyncHandler(async (req, res) => {
    try {
      const { idEpicerie } = req.params; // Obtenez l'ID de l'épicerie à partir des paramètres de la requête
      const { name, mail, nameCompany, image, description, phone, latitude, longitude } = req.body;
  
      // Recherchez l'épicerie dans la base de données en utilisant son ID
      const epicerie = await Epicerie.findById(idEpicerie);
  
      if (!epicerie) {
        // Si l'épicerie n'est pas trouvée, renvoyez une réponse appropriée
        return res.status(404).json({ message: "Épicerie non trouvée." });
      }
  
      // Mettez à jour les champs de l'épicerie avec les valeurs fournies
      if(name){
        epicerie.name = name;
      }

      if(mail){
        epicerie.mail = mail;        
      }

      if(nameCompany){
        epicerie.nameCompany = nameCompany;        
      }

      if(image){
        epicerie.image = image;        
      }

      if(description){
        epicerie.description = description;        
      }

      if(phone){
        epicerie.phone = phone;        
      }

      if(latitude){
        epicerie.latitude = latitude;        
      }

      if(longitude){
        epicerie.longitude = longitude;        
      }
  
      // Sauvegardez les modifications dans la base de données
      await epicerie.save();
  
      // Renvoyez un message de succès
      res.status(200).json({ message: "Profil d'épicerie mis à jour avec succès." });
    } catch (error) {
      // En cas d'erreur, renvoyez une réponse d'erreur au client
      console.error(error);
      res.status(500).json({ error: "Erreur lors de la mise à jour du profil de l'épicerie." });
    }
  });

module.exports = {
  readProfile,
  updateProfile
};

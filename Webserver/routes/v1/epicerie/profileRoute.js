const express = require('express')
const router = express.Router()
const profileController = require('../../../controllers/v1/epicerie/profileControllers')
const verifyJWT = require('../../../middleware/verifyJWT')


router.use(verifyJWT)
const multer = require("multer");

// Définir le dossier de destination pour enregistrer les images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../../../RAYONAFRIQUE/RAYONAFRIQUEV1/RayonAfrique/src/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + file.originalname);
  },
});

// Initialiser Multer avec la configuration de stockage
const upload = multer({ storage: storage });

const logImage = (req, res, next) => {
    console.log(req.file);
    next();
  };

router.route('/read')
    .get(profileController.readProfile)

router.patch('/update', upload.single("image"),logImage, profileController.updateProfile)
    
module.exports = router
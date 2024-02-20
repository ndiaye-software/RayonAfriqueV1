const express = require("express");
const router = express.Router();
const productController = require("../../../controllers/v1/epicerie/productControllers");

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

router.post("/image/upload-image", upload.single("image"), productController.postImage);

router.get("/image/get-image", productController.getImage);

router.route("/read/").get(productController.getProduct);

router.route("/read/:idProduct").get(productController.getProductById);

router.post("/create", upload.single("image"), productController.createProduct);

module.exports = router;

const express = require("express");

const {
    readEpicerieById,
    searchEpicerieByName,
    readEpicerieProfile,
    getEpicerieProductByIdEpicerie
} = require("../../../controllers/v1/user/epicerieControllers");

const router = express.Router();

router.get("/read/:id", readEpicerieById);
router.post("/search", searchEpicerieByName);
router.get("/profile/:idEpicerie", readEpicerieProfile);
router.get("/epicerieProduct/:idEpicerie", getEpicerieProductByIdEpicerie);

module.exports = router;
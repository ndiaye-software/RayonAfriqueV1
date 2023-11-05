const express = require("express");

const {
  readEpicerie,
  readEpicerieById,
  updateEpicerie,
  deleteEpicerie,
  searchEpicerieByName,
  createEpicerie
} = require("../../../controllers/v1/admin/epicerieControllers");

const router = express.Router();

router.post("/create", createEpicerie);
router.get("/read", readEpicerie);
router.get("/read/:id", readEpicerieById);
router.post("/search/", searchEpicerieByName);
router.patch("/update/:id", updateEpicerie);
router.delete("/delete/:id", deleteEpicerie);

module.exports = router;

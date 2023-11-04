const express = require("express");
const router = express.Router();
const epicerieroductController = require("../../../controllers/v1/admin/epicerieProductControllers");

router
    .route("/read")
    .get(epicerieroductController.getEpicerieProduct);

router
    .route("/create")
    .post(epicerieroductController.createEpicerieProduct);

router
    .route("/createNotExist")
    .post(epicerieroductController.createEpicerieProductNotExist);


router
  .route("/update/:id")
  .patch(epicerieroductController.updateEpicerieProduct);

router
  .route("/delete/:id")
  .delete(epicerieroductController.deleteEpicerieProduct);

module.exports = router;

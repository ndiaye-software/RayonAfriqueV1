const express = require("express");
const router = express.Router();
const epicerieroductController = require("../../../controllers/v1/admin/productEpicerieControllers");

router
    .route("/read")
    .get(epicerieroductController.getEpicerieProduct);


router
    .route("/read/:idEpicerie")
    .get(epicerieroductController.getEpicerieProductByIdEpicerie);

router
    .route("/create")
    .post(epicerieroductController.createEpicerieProduct);


router
  .route("/update/:id")
  .patch(epicerieroductController.updateEpicerieProduct);

router
  .route("/delete/:id")
  .delete(epicerieroductController.deleteEpicerieProduct);

module.exports = router;

const express = require("express");
const router = express.Router();
const epicerieroductController = require("../../../controllers/v1/epicerie/productEpicerieControllers");


router
    .route("/read")
    .get(epicerieroductController.getEpicerieProductByIdEpicerie);

router
    .route("/create/:idEpicerie")
    .post(epicerieroductController.createEpicerieProduct);


router
  .route("/update/:idEpicerie/:id")
  .patch(epicerieroductController.updateEpicerieProduct);

router
  .route("/delete/:idEpicerie/:id")
  .delete(epicerieroductController.deleteEpicerieProduct);

module.exports = router;

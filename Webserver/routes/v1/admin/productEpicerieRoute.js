const express = require("express");
const router = express.Router();
const epicerieroductController = require("../../../controllers/v1/admin/epicerieProductControllers");

router.route("/read")
    .get(epicerieroductController.getEpicerieProduct);

router.route("/create")
    .post(epicerieroductController.createEpicerieProduct);

router.route("/createNotExist")
    .post(epicerieroductController.createEpicerieProductNotExist);

router
  .route("/update/:idProduct")
  .patch(epicerieroductController.updateEpicerieProduct);

router
  .route("/delete/:idProduct")
  .delete(epicerieroductController.deleteEpicerieProduct);

module.exports = router;

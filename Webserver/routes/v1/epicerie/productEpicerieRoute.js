const express = require("express");
const router = express.Router();
const epicerieproductController = require("../../../controllers/v1/epicerie/productEpicerieControllers");
const verifyJWT = require('../../../middleware/verifyJWT')

router.use(verifyJWT)

router
    .route("/read")
    .get(epicerieproductController.getEpicerieProductByIdEpicerie);

router
    .route("/read/:idEpicerieProduct")
    .get(epicerieproductController.getProductDetailsByIdProduct);

router
    .route("/create")
    .post(epicerieproductController.createEpicerieProduct);


router
  .route("/update/:id")
  .patch(epicerieproductController.updateEpicerieProduct);

router
  .route("/delete/:idEpicerie/:id")
  .delete(epicerieproductController.deleteEpicerieProductById);

router
  .route("/delete/listproduct")
  .delete(epicerieproductController.deleteEpicerieProductsByNameList);

module.exports = router;

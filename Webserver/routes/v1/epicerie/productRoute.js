const express = require('express')
const router = express.Router()
const productController = require('../../../controllers/v1/epicerie/productEpicerieControllers')

router.route('/read/:idEpicerie')
    .get(productController.getEpicerieProducts)

router.route('/create/:idEpicerie')
    .post(productController.createEpicerieProduct)

router.route('/update/:idProduct')
    .patch(productController.updateEpicerieProduct)

router.route('/delete/:idProduct')
    .delete(productController.deleteEpicerieProduct)
    
module.exports = router
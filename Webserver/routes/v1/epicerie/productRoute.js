const express = require('express')
const router = express.Router()
const productController = require('../../../controllers/v1/epicerie/productControllers')

router.route('/read/:idEpicerie')
    .get(productController.getEpicerieProducts)

router.route('/create/:idEpicerie')
    .post(productController.createEpicerieProduct)

router.route('/update/:idProduct')
    .post(productController.updateEpicerieProduct)

router.route('/delete/:idProduct')
    .post(productController.deleteEpicerieProduct)
    
module.exports = router
const express = require('express')
const router = express.Router()
const productController = require('../../../controllers/v1/epicerie/productControllers')

router.route('/read/')
    .get(productController.getProduct)

router.route('/read/:idProduct')
    .get(productController.getProductById)

router.route('/search/')
    .post(productController.searchProduct)

router.route('/create/:idEpicerie')
    .post(productController.createProduct)
    
module.exports = router
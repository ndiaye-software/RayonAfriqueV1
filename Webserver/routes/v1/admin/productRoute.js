const express = require('express')
const router = express.Router()
const productController = require('../../../controllers/v1/admin/productControllers')

router.route('/read')
    .get(productController.getProduct)

router.route('/read/:idProduct')
    .get(productController.getProductById)

router.route('/create')
    .post(productController.createProduct)

router.route('/update/:idProduct')
    .patch(productController.updateProduct)

router.route('/delete/:idProduct')
    .delete(productController.deleteProduct)
    
module.exports = router
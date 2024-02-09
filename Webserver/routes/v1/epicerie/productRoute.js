const express = require('express')
const router = express.Router()
const productController = require('../../../controllers/v1/epicerie/productControllers')
const verifyJWT = require('../../../middleware/verifyJWT')

router.use(verifyJWT)

router.route('/read/')
    .get(productController.getProduct)

router.route('/read/:idProduct')
    .get(productController.getProductById)

router.route('/search/')
    .post(productController.searchProduct)

router.route('/create')
    .post(productController.createProduct)
    
module.exports = router
const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/v1/marque/authController')

router.route('/signUp').post(authController.signUp)

router.route('/verification')
    .post(authController.updateMarqueStatus)
    
module.exports = router
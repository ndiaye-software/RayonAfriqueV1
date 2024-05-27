const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/v1/marque/authController')

router.route('/signUp').post(authController.signUp)
    
module.exports = router
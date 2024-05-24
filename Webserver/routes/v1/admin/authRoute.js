const express = require('express')
const router = express.Router()
const authController = require('../../../controllers/v1/admin/authControllers')
const loginLimiter = require('../../../middleware/loginLimiter')

router.route('/login')
    .post(loginLimiter, authController.login)

router.route('/refresh')
    .get(authController.refresh)

router.route('/logout')
    .post(authController.logout)

router.route('/signUp')
    .post(authController.signUp)
    
router.route('/reinitialisation')
    .post(authController.SendTokenReinitialisation)

router.route('/modification/:id/:token')
    .post(authController.resetPassword)

router.route('/verification')
    .post(authController.updateAdminStatus)
    
module.exports = router
const express = require('express')
const router = express.Router()
const profileController = require('../../../controllers/v1/epicerie/profileControllers')

router.route('/read')
    .get(profileController.readProfile)

router.route('/update')
    .patch(profileController.updateProfile)
    
module.exports = router
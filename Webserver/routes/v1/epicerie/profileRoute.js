const express = require('express')
const router = express.Router()
const profileController = require('../../../controllers/v1/epicerie/profileControllers')

router.route('/readProfile/:idEpicerie')
    .get(profileController.readProfile)

router.route('/updateProfile')
    .patch(profileController.updateProfile)
    
module.exports = router
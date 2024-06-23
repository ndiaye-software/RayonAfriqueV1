const express = require('express')
const router = express.Router()
const profileController = require('../../../controllers/v1/epicerie/profileControllers')
const verifyJWT = require('../../../middleware/verifyJWT')


router.use(verifyJWT)

router.route('/read')
    .get(profileController.readProfile)

router.patch('/update', profileController.updateProfile)
    
module.exports = router
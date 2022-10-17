const router = require('express').Router()
const authController = require('../controllers/authController/authController')
router.post('/register', authController.register)
module.exports = router
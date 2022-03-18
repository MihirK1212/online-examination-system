const express = require('express')
const router = express.Router()

const {googlelogin} = require('../controllers/auth')

router.route('/googlelogin').post(googlelogin);

module.exports = router
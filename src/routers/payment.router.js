const express = require('express')

const controller = require('../controllers/payment.controller')

const router = express.Router()

router.post('/checkout',controller.checkout)

module.exports = router
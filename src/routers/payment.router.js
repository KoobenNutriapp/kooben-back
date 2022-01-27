const express = require('express')

const controller = require('../controllers/payment.controller')

const router = express.Router()

router.post('/checkout',controller.checkout)

router.post('/webhook',controller.webhook)

module.exports = router
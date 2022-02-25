const express = require('express')

const controller = require('../controllers/payment.controller')
const { route } = require('./recipe.router')

const router = express.Router()

router.post('/checkout',controller.checkout)

router.post('/webhook',controller.webhook)

router.post('/addKey',controller.addKey)

router.get('/keys',controller.getKeys)

router.get('/customer',controller.getCustomerID)

router.get('/apiKey:id',controller.getApiKey)

router.delete('/:id',controller.deleteApiKey)

module.exports = router
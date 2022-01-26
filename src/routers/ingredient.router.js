const express = require('express')

const controller = require('../controllers/ingredient.controller')

const router = express.Router()

router.post('/',controller.createIngredient)

module.exports = router
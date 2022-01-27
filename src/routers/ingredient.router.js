const express = require('express')

const controller = require('../controllers/ingredient.controller')

const router = express.Router()

router.post('/',controller.createIngredient)

router.get('/',controller.getAllIngredients)

router.get('/:id',controller.getIngredientById)

router.patch('/:id',controller.updateIngredient)

router.delete('/:id',controller.deleteIngredient)

module.exports = router
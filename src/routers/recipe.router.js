const express = require('express')

const controller = require('../controllers/recipe.controller')

const router = express.Router()

router.post('/',controller.createRecipe)

router.get('/',controller.getAllRecipes)

module.exports = router
const express = require('express')

const controller = require('../controllers/recipe.controller')

const router = express.Router()

router.post('/',controller.createRecipe)

router.patch('/edit-recipe/:recipeID',controller.updateRecipe)
module.exports = router
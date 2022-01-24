const Recipe = require ('../models/recipe.model')

async function createRecipe(recipe) {
  const creatRecipe = await Recipe.create(recipe)
}

async function getAllRecipes() {
  const allRecipes = await Recipe.find()
  return allRecipes
}

module.exports = {
    createRecipe,
    getAllRecipes,
}

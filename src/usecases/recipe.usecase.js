const Recipe = require ('../models/recipe.model')

async function createRecipe(recipe) {
  const createRecipe = await Recipe.create(recipe)
}

async function getAllRecipes() {
  const allRecipes = await Recipe.find()
  return allRecipes
}

async function updateRecipe(id,recipe) {
  return await Recipe.updateOne({_id: id},recipe)
}

async function getRecipeById(id){
  return await Recipe.findById(id)
}

async function deleteRecipe(id){
  return await Recipe.findByIdAndRemove(id)
}

module.exports = {
    createRecipe,
    getAllRecipes,
    updateRecipe,
    getRecipeById,
    deleteRecipe
}

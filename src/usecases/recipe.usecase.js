const Recipe = require ('../models/recipe.model')

async function createRecipe(recipe) {
  const creatRecipe = await Recipe.create(recipe)
}

async function updateRecipe(recipe) {
  const creatRecipe = await Recipe.updateOne(recipe)
}


module.exports = {
    createRecipe,
    updateRecipe
}

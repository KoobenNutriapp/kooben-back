const Recipe = require ('../models/recipe.model')

async function createRecipe(recipe) {
  const creatRecipe = await Recipe.create(recipe)
}


module.exports = {
    createRecipe,
}

const Ingredient = require ('../models/ingredient.model')

async function createIngredient(ingredient) {
  const createIngredient = await Ingredient.create(ingredient)
}

module.exports = {
    createIngredient,
}

const Ingredient = require ('../models/ingredient.model')

async function createIngredient(ingredient) {
  const createIngredient = await Ingredient.create(ingredient)
}

async function getAllIngredients() {
  const allIngredients = await Ingredient.find().select('name')
  return allIngredients
}

async function getIngredientById(id){
  return await Ingredient.findById(id)
}

async function deleteIngredient(id){
  return await Ingredient.findByIdAndRemove(id)
}

module.exports = {
    createIngredient,
    getAllIngredients,
    getIngredientById,
    deleteIngredient,
}

const ingredient = require('../usecases/ingredient.usecase')

async function createIngredient(request,response) {
  console.log(request.body);
try {
    const newIngredient = request.body
    const createIngredient = await ingredient.createIngredient(newIngredient)
    response.statusCode = 201
    response.json({
        success: true,
        message: 'Ingredient succesfully created!',
        data: {
            recipe: newIngredient,
        }
    })
} catch (error) {
    console.error(error);
    response.statusCode = 500
    response.json({
        success: false,
        message: 'Could not create ingredient',
        error,
    })
}
}

module.exports = {
  createIngredient,
}
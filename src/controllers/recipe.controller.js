const recipe = require('../usecases/recipe.usecase')


async function createRecipe(request,response) {
    console.log(request.query);
  try {
      const newRecipe = request.query
      const createRecipe = await recipe.createRecipe(newRecipe)
      response.statusCode = 201
      response.json({
          success: true,
          message: 'Recipe succesfully created!',
          data: {
              recipe: newRecipe,
          }
      })
  } catch (error) {
      console.error(error);
      response.statusCode = 500
      response.json({
          success: false,
          message: 'Could not create recipe',
          error,
      })
  }
}

module.exports = {
    createRecipe,
}

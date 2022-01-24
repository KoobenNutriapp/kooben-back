const recipe = require('../usecases/recipe.usecase')
const Recipe = require('../models/recipe.model')


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

async function updateRecipe(request, response, next){
    console.log('entro a update recipe')
    const recipeId = request.body.recipeId;
    const updatedURL= request.body.url;
    const updatedTags = request.body.tags;
    const updatedAuthor = request.body.author;
    
    Updatedrecipe = {}
    Recipe.findById(recipeId)
      .then(recipe => {
        console.log('----------')
        console.log(recipe)
        recipe.title = updatedURL;
        recipe.price = updatedTags;
        recipe.author = updatedAuthor;
        Updatedrecipe = recipe;
        return recipe.save();
      })
      .then(result => {
        console.log('UPDATED PRODUCT!');
        response.statusCode = 200
        response.json({
            success: true,
            message: 'Recipe succesfully UPDATED!',
            data: {
                recipe: Updatedrecipe,
                }
            })
        })
      .catch(err => console.log(err));
  };

module.exports = {
    createRecipe,
    updateRecipe
}

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

async function getAllRecipes(request,response) {
    try {
        const allRecipes = await recipe.getAllRecipes()
        const type = request.query.type
        const search = request.query.search


        let filteredRecipes = null

        if(type === "prehispanic"){
            filteredRecipes = allRecipes.filter((recipe) => recipe.type.includes('prehispanic'))
        }else{
            filteredRecipes = allRecipes
        }

        if(search){
            filteredRecipes = allRecipes.filter((recipe) => recipe.title.includes(search))
        }else{
            filteredRecipes = allRecipes
        }
        
        response.statusCode = 200
        response.json({
            success: true,
            message: 'All recipes',
            data: {
                recipes: filteredRecipes,
            }
        })
    } catch (error) {
        console.error(error);
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not get recipes',
            error,
        })
    }
  }

module.exports = {
    createRecipe,
    getAllRecipes,
}

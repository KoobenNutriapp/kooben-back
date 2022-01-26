const ingredient = require('../usecases/ingredient.usecase')

async function createIngredient(request,response) {
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

async function getAllIngredients(request,response) {
    try {
        const allIngredients = await ingredient.getAllIngredients()

        const search = request.query.search?.toLowerCase();
        let filteredIngredients = null;
      
        console.log("search: " + search);
      
        if (search) {
            filteredIngredients = allIngredients.filter((ingredient) => {
                return ingredient.name.toLowerCase().includes(search)
            });

          console.log("free_search: " + filteredIngredients.length);
        }
      
        if (filteredIngredients === null) {
            filteredIngredients = allIngredients;
            console.log("all_ingredients: " + filteredIngredients.length);
        }

        response.statusCode = 200
        response.json({
            success: true,
            message: 'Ingredients',
            data: {
                ingredients: filteredIngredients,
            }
        })
    } catch (error) {
        console.error(error);
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not get ingredients',
            error,
        })
    }
  }

  async function getIngredientById(request, response){

    const id = request.params.id
    try{
        const getIngredientById = await ingredient.getIngredientById(id)

        response.json({
            success: true,
            message: id,
            data: {
                getIngredientById,
            }
        })
    }catch(error){
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not get ingredient.',
            error,
        })
    }
  }

  async function deleteIngredient(request,response){

    const id = request.params.id;
    try {
        const deleteIngredient = await ingredient.deleteIngredient(id)

        response.statusCode = 200
        response.json({
            success: true,
            message: 'ingredient succesfully deleted!'
            })
    } catch (error) {
        console.error(error);
        response.statusCode = 500
        response.json({
            success: false,
            message: 'Could not delete ingredient',
            error,
        })
    }
}


module.exports = {
  createIngredient,
  getAllIngredients,
  getIngredientById,
  deleteIngredient,
}
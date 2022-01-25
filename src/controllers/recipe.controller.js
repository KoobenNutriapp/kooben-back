const recipe = require('../usecases/recipe.usecase')

async function createRecipe(request,response) {
    console.log(request.query);
    console.log(request.body);
  try {
      const newRecipe = request.body
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
    
    Updatedrecipe = {}
    try {
        const recipeId = request.body.recipeId;
        const updatedURL= request.body.url;
        const updatedTags = request.body.tags;
        const updatedAuthor = request.body.author;
        

        const recipe2 = await recipe.getRecipeById(recipeId)
        recipe2.title = updatedURL;
        recipe2.price = updatedTags;
        recipe2.author = updatedAuthor;
        Updatedrecipe = recipe2;
        const editRecipe = await recipe.updateRecipe(recipeId,Updatedrecipe)

        response.statusCode = 200
        response.json({
            success: true,
            message: 'Recipe succesfully UPDATED!',
            data: {
                recipe: Updatedrecipe,
                }
            })
    } catch (error) {
        console.log(error)
    }
    
    /* UPDTADING USING THEN */

    /*
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
      */
  };


async function getRecipeById(request, response){
    console.log('hola')
    console.log(request.query);
    console.log(request.params.id)
    try{
        const idRecipe = request.params.id;

        const getRecipeById = await recipe.getRecipeById(idRecipe);
        console.log(getRecipeById)
        response.json({
            success: true,
            message: idRecipe,
            data: {
                 getRecipeById,
            }
        })
    }catch(error){
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not get recipe.',
            error,
        });
    };
};

async function getAllRecipes(request,response) {
    try {
        const allRecipes = await recipe.getAllRecipes()

        const type = request.query.type
        const search = request.query.search?.toLowerCase()
        const low_sodium = request.query.low_sodium
        const low_cholesterol = request.query.low_cholesterol
        const low_carbohydrates = request.query.low_carbohydrates
        const low_glycemic_load = request.query.low_glycemic_load
        const low_fat = request.query.low_fat
        const high_proteins = request.query.high_proteins
        const FACTOR_SODIUM = 115
        const FACTOR_CHOLESTEROL = 10
        const FACTOR_CARBOHYDRATES = 12
        const FACTOR_GLYCEMIC_LOAD = 5
        const FACTOR_FAT = 25
        const FACTOR_PROTEINS = 15
        
        let filteredRecipes = null
        
        console.log('search: ' + search);

        if(search){
            filteredRecipes = allRecipes.filter((recipe) => recipe.title.toLowerCase().includes(search))
            console.log('free_search: ' + filteredRecipes.length);
        }

        if(type === "prehispanic"){
            filteredRecipes = allRecipes.filter((recipe) => recipe.type.includes('prehispanic'))
            console.log('prehispanic: ' + filteredRecipes.length);
        }

        if(low_sodium){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_sodium.quantity < FACTOR_SODIUM)
            console.log('low sodium: ' + filteredRecipes.length);
        }

        if(low_cholesterol){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_cholesterol.quantity < FACTOR_CHOLESTEROL)
            console.log('low cholesterol: ' + filteredRecipes.length);
        }

        if(low_carbohydrates){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_carbohydrate.quantity < FACTOR_CARBOHYDRATES)
            console.log('low carbohydrates: ' + filteredRecipes.length);
        }

        if(low_glycemic_load){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_glycemic_load.quantity < FACTOR_GLYCEMIC_LOAD)
            console.log('low_glycemic_load: ' + filteredRecipes.length);
        }

        if(low_fat){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_fat.quantity < FACTOR_FAT)
            console.log('low_fat: ' + filteredRecipes.length);
        }

        if(high_proteins){
            const dataToFilter = filteredRecipes ?? allRecipes
            filteredRecipes = dataToFilter.filter((recipe) => recipe.total_protein.quantity > FACTOR_PROTEINS)
            console.log('high_proteins: ' + filteredRecipes.length);
        }


        if(filteredRecipes === null) filteredRecipes = allRecipes
        
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

async function deleteRecipe(request,response){

    const recipeId = request.body.recipeId;
    try {

        await recipe.deleteRecipe(recipeId)
        response.json({
            success: true,
            message: 'Recipe succesfully DELETED!'
            })

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    createRecipe,
    getAllRecipes,
    getRecipeById,
    updateRecipe,
    deleteRecipe
}

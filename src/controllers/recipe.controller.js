const recipe = require('../usecases/recipe.usecase')
const Recipe = require('../models/recipe.model');
const { response } = require('express');


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
    console.log(request.query);
    try{
        const idRecipe = request.params.id;

        const getRecipeById = await recipe.getRecipeById(idRecipe);
        response.json({
            success: true,
            message: idRecipe,
            data{
                post: getRecipeById,
            }
        })
    }catch(error){
        console.error(error);
        response.statusCode = 500;
        response.json({
            success: false,
            message: 'Could not get recipe.',
            error
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
    updateRecipe,
}

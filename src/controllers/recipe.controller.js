const recipe = require("../usecases/recipe.usecase");
const filters = require("../helpers/filters");

async function createRecipe(request, response) {
  console.log(request.query);
  console.log(request.body);
  try {
    const newRecipe = request.body;
    const createRecipe = await recipe.createRecipe(newRecipe);
    response.statusCode = 201;
    response.json({
      success: true,
      message: "Recipe succesfully created!",
      data: {
        recipe: newRecipe,
      },
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not create recipe",
      error,
    });
  }
}

async function updateRecipe(request, response) {
  console.log("entro a update recipe");

  let updatedRecipe = {};
  try {
    const recipeId = request.body.recipeId;
    const updatedURL = request.body.url;
    const updatedTags = request.body.tags;
    const updatedAuthor = request.body.author;

    const recipe2 = await recipe.getRecipeById(recipeId);
    recipe2.title = updatedURL;
    recipe2.price = updatedTags;
    recipe2.author = updatedAuthor;
    updatedRecipe = recipe2;
    const editRecipe = await recipe.updateRecipe(recipeId, updatedRecipe);

    response.statusCode = 200;
    response.json({
      success: true,
      message: "Recipe succesfully updated!",
      data: {
        recipe: updatedRecipe,
      },
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not update recipe",
      error,
    });
  }
}

async function getRecipeById(request, response) {
  console.log("hola");
  console.log(request.query);
  console.log(request.params.id);
  try {
    const idRecipe = request.params.id;
    const getRecipeById = await recipe.getRecipeById(idRecipe);
    console.log(getRecipeById);
    response.json({
      success: true,
      message: idRecipe,
      data: {
        getRecipeById,
      },
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not get recipe.",
      error,
    });
  }
}

async function getAllRecipes(request, response) {
  try {
    const allRecipes = await recipe.getAllRecipes();
    const filteredRecipes = filters(request, allRecipes);

    response.statusCode = 200;
    response.json({
      success: true,
      message: "Recipes",
      data: {
        recipes: filteredRecipes,
      },
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not get recipes",
      error,
    });
  }
}

async function deleteRecipe(request, response) {
  const recipeId = request.body.recipeId;
  try {
    await recipe.deleteRecipe(recipeId);

    response.statusCode = 200;
    response.json({
      success: true,
      message: "Recipe succesfully deleted!",
    });
  } catch (error) {
    console.error(error);
    response.statusCode = 500;
    response.json({
      success: false,
      message: "Could not delete recipe",
      error,
    });
  }
}

module.exports = {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  updateRecipe,
  deleteRecipe,
};

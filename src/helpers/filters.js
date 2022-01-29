const constants = require("../helpers/constants");

function filterByParams(request, recipes) {
  const type = request.query.type;
  const search = request.query.search?.toLowerCase();
  const low_sodium = request.query.low_sodium;
  const low_cholesterol = request.query.low_cholesterol;
  const low_carbohydrates = request.query.low_carbohydrates;
  const low_glycemic_load = request.query.low_glycemic_load;
  const low_fat = request.query.low_fat;
  const high_proteins = request.query.high_proteins;
  const low_calories = request.query.low_calories;

  let filteredRecipes = null;

  console.log("search: " + search);

  if (search) {
    const searchInTitle = recipes.filter((recipe) =>
      recipe.title?.toLowerCase().includes(search)
    );
    //console.log('searchInTitle: ' + searchInTitle);

    const searchInSynopsis = recipes.filter((recipe) =>
      recipe.synopsis?.toLowerCase().includes(search)
    );
  //console.log('searchInSynopsis: ' + searchInSynopsis);

    const searchInType = recipes.filter((recipe) =>
      recipe.type?.toLowerCase().includes(search)
    );
    //console.log('searchInType: ' + searchInType);

    const searchInSteps = recipes.filter((recipe) => {
      return recipe.steps?.some((step) => {
        return step.text?.toLowerCase().includes(search);
      });
    });
    //console.log('searchInSteps: ' + searchInSteps);

    const searchInTags = recipes.filter((recipe) => {
      return recipe.tags?.some((tags) => {
        return tags.toLowerCase().includes(search);
      });
    });
    //console.log('searchInTags: ' + searchInTags.length);

    const joinSearches = [
      ...searchInTitle,
      ...searchInSynopsis,
      ...searchInType,
      ...searchInTags,
      ...searchInSteps,
    ]
    //console.log('joinSearches: ' + joinSearches);

    const filteredRecipes = joinSearches.reduce((acc,recipe)=>{
      if(!acc.includes(recipe)){
      	acc.push(recipe);
      }
      return acc;
    },[])

    console.log("free_search: " + filteredRecipes.length);
    return filteredRecipes
  }

  if (type === "prehispanic") {
    filteredRecipes = recipes.filter((recipe) =>
      recipe.type.includes("prehispanic")
    );
    console.log("prehispanic: " + filteredRecipes.length);
  }

  if (low_calories) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) => recipe.total_energy.quantity < constants.FACTOR_CALORIES
    );
    console.log("low_calories: " + filteredRecipes.length);
  }

  if (low_sodium) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) => recipe.total_sodium.quantity < constants.FACTOR_SODIUM
    );
    console.log("low sodium: " + filteredRecipes.length);
  }

  if (low_cholesterol) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) =>
        recipe.total_cholesterol.quantity < constants.FACTOR_CHOLESTEROL
    );
    console.log("low cholesterol: " + filteredRecipes.length);
  }

  if (low_carbohydrates) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) =>
        recipe.total_carbohydrate.quantity < constants.FACTOR_CARBOHYDRATES
    );
    console.log("low carbohydrates: " + filteredRecipes.length);
  }

  if (low_glycemic_load) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) =>
        recipe.total_glycemic_load.quantity < constants.FACTOR_GLYCEMIC_LOAD
    );
    console.log("low_glycemic_load: " + filteredRecipes.length);
  }

  if (low_fat) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) => recipe.total_fat.quantity < constants.FACTOR_FAT
    );
    console.log("low_fat: " + filteredRecipes.length);
  }

  if (high_proteins) {
    const dataToFilter = filteredRecipes ?? recipes;
    filteredRecipes = dataToFilter.filter(
      (recipe) => recipe.total_protein.quantity > constants.FACTOR_PROTEINS
    );
    console.log("high_proteins: " + filteredRecipes.length);
  }

  if (filteredRecipes === null) {
    filteredRecipes = recipes;
    console.log("all_recipes: " + filteredRecipes.length);
  }
  return filteredRecipes;
}

module.exports = filterByParams;

const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  url: {
    type: String,
    minlength: 10,
    maxlength: 500,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 200,
  },
  synopsis: {
    type: String,
    minlength: 5,
    maxlength: 1000,
  },
  tags: {
    type: Array,
    required: true,
    maxlength: 4,
  },
  procedures: {
    type: Array,
    maxlength: 50,
  },
  author: {
    type: String,
    minlength: 5,
    maxlength: 200,
  },
  total_energy: {
      type: Number,
  },
  total_carbohydrate: {
      type: Number,
  },
  total_sugars: {
      type: Number,
  },
  total_fiber: {
      type: Number,
  },
  total_sodium: {
      type: Number,
  },
  total_protein: {
      type: Number,
  },
  total_fat: {
      type: Number,
  },
  total_cholesterol: {
      type: Number,
      required: true,
  },
  total_glycemic_load: {
      type: Number,
  },
  created: {
    type: String,
    minlength: 19,
    maxlength: 19,
  },
  edited: {
    type: String,
    minlength: 19,
    maxlength: 19,
  },
  ingredients: [
    {
      _id: {
        type: String,
        minlength: 3,
        maxlength: 50,
      },
      equivalence: {
        cup: {
          type: Number,
        },
        spoon: {
          type: Number,
        },
        piece: {
          type: Number,
        },
        gram: {
          type: Number,
        },
      },
      name: {
        type: String,
        minlength: 2,
        maxlength: 50,
      },
      alias: {
        type: Array,
        maxlength: 50,
      },
      url: {
        type: String,
        minlength: 2,
        maxlength: 200,
      },
      consistency: {
        type: String,
        minlength: 1,
        maxlength: 1,
      },
      energy: {
        type: Number,
      },
      total_carbohydrate: {
        type: Number,
      },
      dietary_fiber: {
        type: Number,
      },
      sugars: {
        type: Number,
      },
      calcium: {
        type: Number,
      },
      phosphorus: {
        type: Number,
      },
      iron: {
        type: Number,
      },
      sodium: {
        type: Number,
      },
      potassium: {
        type: Number,
      },
      magnesium: {
        type: Number,
      },
      copper: {
        type: Number,
      },
      zinc: {
        type: Number,
      },
      manganese: {
        type: Number,
      },
      selenium: {
        type: Number,
      },
      lithium: {
        type: Number,
      },
      vitA: {
        type: Number,
      },
      carotene: {
        type: Number,
      },
      bcarotene: {
        type: Number,
      },
      vitB1: {
        type: Number,
      },
      vitC: {
        type: Number,
      },
      folicAc: {
        type: Number,
      },
      vitD: {
        type: Number,
      },
      vitE: {
        type: Number,
      },
      vitK: {
        type: Number,
      },
      protein: {
        type: Number,
      },
      total_fat: {
        type: Number,
      },
      saturated_fatty_acids: {
        type: Number,
      },
      monounsaturated_fatty_acids: {
        type: Number,
      },
      polyunsaturated_fatty_acids: {
        type: Number,
      },
      cholesterol: {
        type: Number,
      },
      glycemic_index: {
        type: Number,
      },
    },
   ],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;

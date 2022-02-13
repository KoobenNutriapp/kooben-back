const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
  status: {
    type: Boolean,
    default: true,
  },
  url: {
    type: String,
    minlength: 10,
    maxlength: 500,
    required: true,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  synopsis: {
    type: String,
    minlength: 5,
    maxlength: 1000,
    required: true,
  },
  tags: {
    type: Array,
    required: true,
    maxlength: 4,
  },
  steps: [
    {
      sequence: {
        type: Number,
        required: true,
        max:1000,
      },
      text: {
        type: String,
        minlength: 5,
        maxlength: 10000,
        required: true,
      },
      url: {
        type: String,
        minlength: 10,
        maxlength: 500,
        required: true,
      },
    }
   ],
  author: {
    type: String,
    minlength: 5,
    maxlength: 200,
    required: true,
  },
  total_energy: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_carbohydrate: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_sugars: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_fiber: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_sodium: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_protein: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_fat: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_cholesterol: {
      type: Number,
      required: true,
      max: 100000,
  },
  total_glycemic_load: {
      type: Number,
      required: true,
      max: 100000,
  },
  created: {
    type: String,
    minlength: 16,
    maxlength: 16,
    required: true,
  },
  edited: {
    type: String,
    minlength: 16,
    maxlength: 16,
    required: true,
  },
  ingredients: [
    {
      ingredient_id: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true,
      },
      ingredient_equivalence: {
        cup: {
          type: Number,
          required:true,
          max:1000,
        },
        spoon: {
          type: Number,
          required:true,
          max:10000,
        },
        piece: {
          type: Number,
          required:true,
          max:1000,
        },
        gram: {
          type: Number,
          required:true,
          max:100000,
        },
      }
    },
   ],
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;

const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        minlength:2,
        maxlength:100,
        required: true,
    },
    alias: {
        type: Array,
        required:true,
    },
    url: {
      type: String,
      minlength:10,
      maxlength:500,
      required: true,
    },
    consistency: {
      type: String,
      minlength:1,
      maxlength:1,
      required: true,
    },
    equivalence: {
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
    },
    energy: {
      type: Number,
      required: true,
      max: 100000,
    },
    total_carbohydrate: {
      type: Number,
      required: true,
      max: 100000,
    },
    dietary_fiber: {
      type: Number,
      required: true,
      max: 100000,
    },
    sugars: {
      type: Number,
      required: true,
      max: 100000,
    },
    calcium: {
      type: Number,
      required: true,
      max: 100000,
    },
    phosphorus: {
      type: Number,
      required: true,
      max: 100000,
    },
    iron: {
      type: Number,
      required: true,
      max: 100000,
    },
    sodium: {
      type: Number,
      required: true,
      max: 100000,
    },
    potassium: {
      type: Number,
      required: true,
      max: 100000,
    },
    magnesium: {
      type: Number,
      required: true,
      max: 100000,
    },
    copper: {
      type: Number,
      required: true,
      max: 100000,
    },
    zinc: {
      type: Number,
      required: true,
      max: 100000,
    },
    manganese: {
      type: Number,
      required: true,
      max: 100000,
    },
    selenium: {
      type: Number,
      required: true,
      max: 100000,
    },
    lithium: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitA: {
      type: Number,
      required: true,
      max: 100000,
    },
    carotene : {
      type: Number,
      required: true,
      max: 100000,
    },
    bcarotene: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitB1: {
        type: Number,
        required: true,
        max: 100000,
    },
    vitB2: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitB3: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitB6: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitB12: {
        type: Number,
        required: true,
        max: 100000,
    },
    vitC: {
        type: Number,
        required: true,
        max: 100000,
    },
    folicAc: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitD: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitE: {
      type: Number,
      required: true,
      max: 100000,
    },
    vitK: {
        type: Number,
        required: true,
        max: 100000,
    },
    protein: {
      type: Number,
      required: true,
      max: 100000,
    },
    total_fat: {
      type: Number,
      required: true,
      max: 100000,
    },
    saturated_fatty_acids: {
      type: Number,
      required: true,
      max: 100000,
    },
    monounsaturated_fatty_acids: {
      type: Number,
      required: true,
      max: 100000,
    },
    polyunsaturated_fatty_acids: {
      type: Number,
      required: true,
      max: 100000,
    },
    cholesterol: {
      type: Number,
      required: true,
      max: 100000,
    },
    glycemic_index: {
      type: Number,
      required: true,
      max: 100000,
    },
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;
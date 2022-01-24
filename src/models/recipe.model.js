const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    url: {
      type: String,
      minlength:10,
      maxlength:500,
      required: true,
    },
    type: {
        type: String,
        minlength:10,
        maxlength:20,
        required: true,
    },
    title: {
      type: String,
      minlength:10,
      maxlength:200,
      required: true,
    },
    tags: {
      type: Array,
      required:true,
      maxlength: 4,
    },
    // steps: [
    //   {
    //     sequence: {
    //       type: Number,
    //       required: true,
    //       max:1000,
    //     },
    //     text: {
    //       type: String,
    //       minlength: 5,
    //       maxlength: 10000,
    //       required: true,
    //     },
    //     url: {
    //       type: String,
    //       minlength: 10,
    //       maxlength: 500,
    //       required: true,
    //     },
    //   }
    //  ],
    author: {
      type: String,
      minlength:10,
      maxlength:200,
      required: true,
    },
    // total_energy: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_carbohydrate: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_sugars: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_fiber: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_sodium: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_protein: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_fat: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_cholesterol: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    //   unit: {
    //     type: String,
    //     minlength: 1,
    //     maxlength: 10,
    //     required: true,
    //   }
    // },
    // total_glycemic_load: {
    //   quantity: {
    //     type: Number,
    //     required: true,
    //     max: 100000,
    //   },
    // },
    created: {
      type: String,
      minlength:16,
      maxlength:16,
      required: true,
    },
    edited: {
      type: String,
      minlength:16,
      maxlength:16,
      required: true,
    },
    // likes: {
    //   type: Number,
    //   //required: true,
    //   max: 1000000,
    // },
    // ids_of_likes: {
    //   type: Array,
    //   //required:true,
    //   maxlength: 1000000,
    // },
    // ingredients: [ 
    //   {
    //     ingredient_id: {
    //       type: String,
    //       minlength: 10,
    //       maxlength: 100,
    //       required: true,
    //     },
    //     ingredient_equivalence: {
    //       cup: {
    //         type: Number,
    //         required:true,
    //         max:1000,
    //       },
    //       spoon: {
    //         type: Number,
    //         required:true,
    //         max:10000,
    //       },
    //       piece: {
    //         type: Number,
    //         required:true,
    //         max:1000,
    //       },
    //       gram: {
    //         type: Number,
    //         required:true,
    //         max:100000,
    //       },
    //     }
    //   },
    //  ],
});

const Recipe = mongoose.model('recipe', recipeSchema);

module.exports = Recipe;
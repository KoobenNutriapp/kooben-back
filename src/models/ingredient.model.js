const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
    status: {
        type: Boolean,
        default: true,
    },
    name: {
        type: String,
        minlength:10,
        maxlength:100,
        required: true,
    },
    alias: {
        type: Array,
        required:true,
        maxlength: 10,
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
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    total_carbohydrate: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    dietary_fiber: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    sugars: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    calcium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    phosphorus: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    iron: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    sodium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    potassium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    magnesium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    copper: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    zinc: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    manganese: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    selenium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    lithium: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitA: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    carotene : {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    bcarotene: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitB1: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitB2: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitB3: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitB6: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitB12: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitC: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    folicAc: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitD: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitE: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    vitK: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    protein: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    total_fat: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    saturated_fatty_acids: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    monounsaturated_fatty_acids: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    polyunsaturated_fatty_acids: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    cholesterol: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
      unit: {
        type: String,
        minlength: 1,
        maxlength: 10,
        required: true,
      }
    },
    glycemic_index: {
      quantity: {
        type: Number,
        required: true,
        max: 100000,
      },
    },
});

const Ingredient = mongoose.model('ingredient', ingredientSchema);

module.exports = Ingredient;
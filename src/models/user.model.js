const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
      type: String,
      minlength:3,
      maxlength:50,
      required: true,
    },
    name: {
      type: String,
      minlength:3,
      maxlength:20,
      required: true,
    },
    status: {
        type: Boolean,
        default: true,
    },
    mail: {
      type: String,
      minlength:5,
      maxlength:100,
      required: true,
    },
    rol: {
      type: String,
      minlength:2,
      maxlength:20,
      required: true,
    },
    stripeCustomer:{
      id: {
        type: String,
        minlength:3,
        maxlength:30,
        required: false,
      },
      active: {
        type: Boolean,
        default: false
      },
      apiKey: {
        type: String,
        minlength:3,
        maxlength:30,
        required: false,
      },
      itemId: {
        type: String,
        minlength:3,
        maxlength:20,
        required: false,
      },
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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
    recipes: {
      type: Array,
      required:true,
      maxlength: 1000,
    },
    likes: {
      type: Array,
      required:true,
      maxlength: 1000,
    },
    rol: {
      type: String,
      minlength:2,
      maxlength:20,
      required: true,
    },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
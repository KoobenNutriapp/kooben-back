const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({

})

const ApiKeys = mongoose.model('user', apiSchema);

module.exports = ApiKeys;
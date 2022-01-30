const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
    socialHandles: {
        type: Map, // `socialHandles` is a key/value store for string keys
        of: String // Values must be strings
        }
})

const ApiKey = mongoose.model('ApiKey', apiSchema);

module.exports = ApiKey;
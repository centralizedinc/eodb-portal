var mongoose = require('mongoose');

var RegionsSchema = new mongoose.Schema({
    psgcCode: {
        type: String
    },
    regDesc: {
        type: String
    },
    regCode: {
        type: String
    },
    status: {
        type: String,
        default: 'A'
    }
})

module.exports = mongoose.model('regions', RegionsSchema)
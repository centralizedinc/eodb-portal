var mongoose = require('mongoose');

var CitySchema = new mongoose.Schema({
    psgcCode: {
        type: String
    },
    citymunDesc: {
        type: String
    },
    citymunCode: {
        type: String
    },
    provCode: {
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

module.exports = mongoose.model('cities', CitySchema)
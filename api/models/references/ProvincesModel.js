var mongoose = require('mongoose');

var ProvinceSchema = new mongoose.Schema({
    psgcCode: {
        type: String
    },
    provDesc: {
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

module.exports = mongoose.model('provinces', ProvinceSchema)
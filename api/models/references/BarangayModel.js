var mongoose = require('mongoose');

var BarangaySchema = new mongoose.Schema({
    brgyDesc: {
        type: String
    },
    brgyCode: {
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

module.exports = mongoose.model('barangays', BarangaySchema)
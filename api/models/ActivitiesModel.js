var mongoose = require('mongoose')
var ActivitiesModelSchema = new mongoose.Schema({
    module: {
        type: Number
        /*
         * 0 - permits
         * 1 - payments
         */
    },
    mode: {
        type: Number
        /*
         * 0 - Create
         * 1 - Update
         * 2 - paid
         * 3 - evaluate
         */
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    }
})

module.exports = mongoose.model('activities', ActivitiesModelSchema)
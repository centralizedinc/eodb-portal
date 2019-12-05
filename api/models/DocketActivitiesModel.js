var mongoose = require('mongoose')
var DocketActivitiesSchema = new mongoose.Schema({
    reference_no: {
        type: String
    },
    application_id: {
        type: String
    },
    department: {
        type: String
    },
    approver: {
        type: String
    },
    status: {
        type: Number,
        default: 0
        /**
         * 0 - In Progress
         * 1 - Done
         * 2 - Rejected
         */
    },
    remarks: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    }
})

module.exports = mongoose.model('activities', DocketActivitiesSchema)
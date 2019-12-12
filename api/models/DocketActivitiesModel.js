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
        type: String
        /**
         * applied
         * claim
         * approve
         * reject
         * compliance
         * done
         */
    },
    remarks: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('docket_activities', DocketActivitiesSchema)
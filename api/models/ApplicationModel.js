var mongoose = require('mongoose')
var ApplicationSchema = new mongoose.Schema({
    reference_no: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    date_modified: {
        type: Date
    },
    modified_by: {
        type: String
    },
    status: {
        type: Number,
        default: 0
        /**
         * 0 - In Progress
         * 1 - Approved
         * 2 - Rejected
         */
    },
    application_type: {
        type: String //new || renewal
    },
    details: {}, // Details of Application
    account_id: {
        type: String
    },
    permit_type: {
        type: String
    },
    permit_code: {
        type: String
    }
})

ApplicationSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

ApplicationSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('applications', ApplicationSchema)
var mongoose = require('mongoose')
var CedulaApplication = new mongoose.Schema({
    reference_no: {
        type: String
    },
    date_created: {
        type: Date
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
         * 3 - For Compliance
         */
    },
    account_id: {
        type: String
    },

    // DETAILS
    application_type: {
        type: String //new || renewal
    }
})

CedulaApplication.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

CedulaApplication.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('cedula_applications', CedulaApplication)
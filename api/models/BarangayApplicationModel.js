var mongoose = require('mongoose')
var BarangayApplication = new mongoose.Schema({
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
    name: {
        first: {
            type: String
        },
        middle: {
            type: String
        },
        last: {
            type: String
        },
        suffix: {
            type: String
        }
    },
    gender: {
        type: String
    },
    age: {
        type: Number
    },
    spouse_name: {
        first: {
            type: String
        },
        middle: {
            type: String
        },
        last: {
            type: String
        },
        suffix: {
            type: String
        }
    },
    request_for: {
        type: String
    },
    date_issued: {
        type: Date
    },
    attachments: [{
        title: {
            type: String
        },
        files: []
    }],
    requirements: []
})

BarangayApplication.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

BarangayApplication.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});
module.exports = mongoose.model('barangay_application', BarangayApplication)
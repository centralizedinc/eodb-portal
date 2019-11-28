var mongoose = require('mongoose')
var DocketSchema = new mongoose.Schema({
    application_id: {
        type: String
    },
    application_type: {
        type: String
    },
    permit: {
        type: String
    },
    status: {
        type: String
    },
    payment_status: {
        type: String
    },
    current_department: {
        department: {
            type: String
        },
        approver: {
            type: String
        }
    },
    previous_department: {
        department: {
            type: String
        },
        approver: {
            type: String
        }
    },
    created_by: {
        type: String
    },
    modified_by: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

DocketSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

DocketSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('dockets', DocketSchema)
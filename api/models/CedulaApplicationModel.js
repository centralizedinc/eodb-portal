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
    personal_details: {
        name: {
            last: {
                type: String
            },
            first: {
                type: String
            },
            middle: {
                type: String
            },
            suffix: {
                type: String
            }
        },
        birthday: {
            type: Date
        },
        gender: {
            type: String
        },
        civil_status: {
            type: String
        },
        birthplace: {
            type: String
        },
        icr: {
            type: Number
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        occupation: {
            type: String
        },
        tin: {
            type: Number
        },
    },
    tax: {
        taxable: {
            basic: {
                type: String
            },
            additional: {
                type: Number
            },
            business_income: {
                type: Number
            },
            profession_income: {
                type: Number
            },
            property_income: {
                type: Number
            },
        },
        community: {
            basic: {
                type: Number
            },
            additional: {
                type: Number
            },
            business_income: {
                type: Number
            },
            profession_income: {
                type: Number
            },
            property_income: {
                type: Number
            },
        },
        total: {
            type: Number
        },
        interest: {
            type: Number
        },
        total_amount_paid: {
            type: Number
        }
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
var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var CedulaPermitSchema = new mongoose.Schema({
    auto_id: {
        type: Number
    },
    cedula_no: {
        type: String
    },
    reference_no: {
        type: String
    },
    permit_type: {
        type: String,
        default: "cedula"
    },
    permit_code: {
        type: String
    },
    account_id: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },

    // DETAILS
    application_type: {
        type: String //new || renewal
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
    attachments: [{
        doc_type: {
            type: String
        },
        files: []
    }],
    compliance_attachments: [],
    epermit_attachment: {
        type: String
    }
})

CedulaPermitSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    callback();
});

CedulaPermitSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    callback();
});

const options = {
    field: 'auto_id', // auto_id will have an auto-incrementing value
    incrementBy: 1, // incremented by 2 every time
    nextCount: false, // Not interested in getting the next count - don't add it to the model
    // resetCount: 'reset', // The model and each document can now reset the counter via the reset() method
    startAt: 0, // Start the counter at 1000
    unique: false // Don't add a unique index
};

const plugin = new autoIncrement(CedulaPermitSchema, 'cedula_permits', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('cedula_permits', CedulaPermitSchema)
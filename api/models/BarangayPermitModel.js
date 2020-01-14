var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var BarangayPermitSchema = new mongoose.Schema({
    auto_id: {
        type: Number
    },
    barangay_no: {
        type: String
    },
    reference_no: {
        type: String
    },
    permit_type: {
        type: String,
        default: "barangay"
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
    barangay_type: {
        type: String //business || residential
    },
    purpose: [],
    personal_details: {
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
        birthdate: {
            type: String
        },
        birthplace: {
            type: String
        },
        gender: {
            type: String
        },
        civil_status: {
            type: String
        },
        ctc_no: {
            type: String
        },

    },
    residential_address: {
        bldg_no: {
            type: String
        },
        unit_no: {
            type: String
        },
        bldg_name: {
            type: String
        },
        street: {
            type: String
        },
        subd: {
            type: String
        },
        region: {
            type: String
        },
        province: {
            type: String
        },
        city: {
            type: String
        },
        barangay: {
            type: String
        },
        postal_code: {
            type: String
        }
    },
    age: {
        type: Number
    },
    // business details
    business_details: {
        business_name: {
            type: String
        },
        business_owner: {
            type: String
        },
        business_type: {
            type: String
        },
        franchise: {
            type: String
        },
    },
    business_address: {
        bldg_no: {
            type: String
        },
        unit_no: {
            type: String
        },
        bldg_name: {
            type: String
        },
        street: {
            type: String
        },
        subdivision: {
            type: String
        },
        region: {
            type: String
        },
        province: {
            type: String
        },
        city: {
            type: String
        },
        barangay: {
            type: String
        },
        postal_code: {
            type: String
        }
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
    requestor: {
        type: String
    },
    request_for: {
        type: String
    },
    date_issued: {
        type: Date
    },
    attachments: [{
        doc_type: {
            type: String
        },
        files: [{
            url: {
                type: String
            },
            type: {
                type: String
            }
        }]
    }],
    compliance_attachments: [{
        url: {
            type: String
        },
        type: {
            type: String
        }
    }],
    epermit_attachment: {
        url: {
            type: String
        },
        type: {
            type: String
        }
    }
})

BarangayPermitSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    callback();
});

BarangayPermitSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(BarangayPermitSchema, 'barangay_permits', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('barangay_permits', BarangayPermitSchema)
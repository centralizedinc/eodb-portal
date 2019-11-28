var mongoose = require('mongoose')
var BusinessPermitSchema = new mongoose.Schema({
    application_type: {
        type: String //new || renewal
    },
    owner_details: {
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
            type: Date
        },
        birthplace: {
            type: String
        },
        gender: {
            type: String
        },
        telno: {
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        tin: {
            type: String
        },
        civil_status: {
            type: String
        },
        job_title: {
            type: String
        },
        salary: {
            type: Number
        }
    },
    owner_address: {
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
    business_details: {
        business_name: {
            type: String
        },
        business_type: {
            type: String
        },
        registration_no: {
            type: String
        },
        registration_date: {
            type: String
        },
        tin: {
            type: String
        },
        ctc_no: {
            type: String
        },
        business_area: {
            type: Number
        },
        no_of_employees: {
            type: Number
        },
        telno: {
            type: String
        },
        mobile: {
            type: String
        },
        email: {
            type: String
        },
        enjoying_tax_incentive: {
            type: Boolean
        },
        specify_tax_incentive: {
            type: String
        },
        line_of_business: []
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
        },
        is_rented: {
            type: Boolean
        },
        rental: {
            type: String
        },
        lessor_name: {
            type: String
        },
        rental_address: {
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
        contact_no: {
            type: String
        },
        email: {
            type: String
        }
    },
    attachments: [{
        title: {
            type: String
        },
        attachment: {}
    }],
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

BusinessPermitSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

BusinessPermitSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('departments', BusinessPermitSchema)
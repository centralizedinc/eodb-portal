var mongoose = require('mongoose')
var BusinessPermitApplication = new mongoose.Schema({
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
         */
    },

    // DETAILS
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
        occupation: {
            type: String
        },
        monthly_salary: {
            type: Number
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        icr_no: {
            type: String
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
        franchise: {
            type: String
        },
        registration_no: {
            type: String
        },
        registration_date: {
            type: String
        },
        _tin: {
            type: String
        },
        get tin_1() {
            return this._tin;
        },
        set tin_1(value) {
            this._tin = value;
        },
        get tin() {
            return this._tin;
        },
        set tin(value) {
            this._tin = value;
        },
        ctc_no: {
            type: String
        },
        pin: {
            type: String
        },
        business_area: {
            type: Number
        },
        employees_establishment: {
            type: Number
        },
        employees_residing: {
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
        specify_entity: {
            type: String
        },
        line_of_business: [{
            code: {
                type: String
            },
            description: {
                type: String
            },
            units: {
                type: Number
            },
            capital_investment: {
                type: Number
            },
            essential: {
                type: Number
            },
            non_essential: {
                type: Number
            }
        }],
        measure_or_pax: [{
            unit: {
                type: Number
            },
            capacity: {
                type: Number
            },
            measure_or_pax: {
                type: String
            },
            line_of_business: {
                type: String
            }
        }],
        capital_investment: {
            type: Number
        }
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
        doc_type: {
            type: String
        },
        files: []
    }],
    compliance_attachments: [],
    account_id: {
        type: String
    }
})

BusinessPermitApplication.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

BusinessPermitApplication.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('business_applications', BusinessPermitApplication)
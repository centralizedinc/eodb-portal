var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var PolicePermitSchema = new mongoose.Schema({
    auto_id: {
        type: Number
    },
    police_no: {
        type: String
    },
    reference_no: {
        type: String
    },
    permit_type: {
        type: String,
        default: "police"
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
        other_country: {
            type: String
        },
        icr_no: {
            type: Number
        },
        gender: {
            type: String
        },
        civil_status: {
            type: String
        },
        height: {
            type: Number
        },
        weight: {
            type: Number
        },
        blood_type: {
            type: String
        },
        identification_marks: {
            type: String
        },
        complexion: {
            type: String
        },
        educational_attainment: {
            type: String
        },
        occupation: {
            type: String
        },
        ctc_no: {
            type: String
        }
    },
    family_background: {
        father_info: {
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
            birthplace: {
                type: String
            },
            other_country: {
                type: String
            }
        },
        mother_info: {
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
            birthplace: {
                type: String
            },
            other_country: {
                type: String
            }
        },
        spouse_info: {
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
            birthplace: {
                type: String
            },
            other_country: {
                type: String
            }
        }
    },
    address_details: {
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
        coordinates: {
            lat: {
                type: String
            },
            lng: {
                type: String
            }
        }
    },
    contact_details: {
        tel_no: {
            type: Number
        },
        mobile: {
            type: Number
        },
        email: {
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

PolicePermitSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    callback();
});

PolicePermitSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(PolicePermitSchema, 'police_permits', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('police_permits', PolicePermitSchema)
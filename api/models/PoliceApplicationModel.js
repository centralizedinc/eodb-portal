var mongoose = require('mongoose')
var PoliceApplication = new mongoose.Schema({
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
        birthday: {
            type: Date
        },
        birthplace: {
            type: String
        },
        other_country: {
            type: String
        },
        icr: {
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
        }
    },
    contact_details: {
        tel_no: {
            type: Number
        },
        mobile_no: {
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
        title: {
            type: String
        },
        files: []
    }],
    requirements: []
})

PoliceApplication.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

PoliceApplication.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});
module.exports = mongoose.model('police_application', PoliceApplication)
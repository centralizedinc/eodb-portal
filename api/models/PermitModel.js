var mongoose = require('mongoose')
var PermitModelSchema = new mongoose.Schema({
    reference_no: {
        type: String
    },
    renewal_ref_no: {
        type: String
    },
    tw_id: {
        type: String
    },
    current_task: {
        task: {
            type: String
        },
        approver: {
            type: String
        }
    },
    previous_task: {
        task: {
            type: String
        },
        approver: {
            type: String
        }
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
    }]

    // application: {
    //     permit_type: {
    //         type: String
    //     },
    //     app_type: {
    //         type: Number
    //         //1 - New
    //         //2 - Renewal
    //     },
    //     reference_no: {
    //         type: Number
    //     },
    //     pbr_date: {
    //         type: Date
    //     },
    //     lgu_date: {
    //         type: Date
    //     },
    //     registration_no: {
    //         type: Number
    //     },
    //     date_created: {
    //         type: Date,
    //         default: new Date()
    //     },
    // },
    // business: {
    //     ownership: {
    //         type: Number
    //         // 1 - Sole Proprietorship
    //         // 2 - Partnership
    //         // 3 - Corporation
    //     },
    //     tin: {
    //         type: Number
    //     },
    //     sss: {
    //         type: Number
    //     },
    //     business_name: {
    //         type: String
    //     },
    //     contact: {
    //         type: Number
    //     },
    //     email: {
    //         type: String
    //     },
    //     business_address: {
    //         type: String
    //     },
    //     // AMO - Applicant/Manager/Owner
    //     amo: {
    //         name: {
    //             type: String
    //         },
    //         address: {
    //             type: String
    //         },
    //         contact: {
    //             type: Number
    //         },
    //         email: {
    //             type: String
    //         }
    //     },
    //     business_area: {
    //         type: String
    //     },
    //     owner_no: {
    //         type: Number
    //     },
    //     employees_no: {
    //         professional: {
    //             type: Number
    //         },
    //         non_professional: {
    //             type: Number
    //         }
    //     },
    //     business_type: {
    //         type: Number
    //         // 1 - Rented
    //         // 2 - Owned
    //     },
    //     rented: {
    //         lessor: {
    //             type: String
    //         },
    //         monthly_rental: {
    //             type: Number
    //         },
    //         lessor_address: {
    //             type: String
    //         },
    //         lessor_contact: {
    //             type: Number
    //         },
    //         lessor_email: {
    //             type: String
    //         }
    //     },
    //     property_pin: {
    //         land: {
    //             type: Number
    //         },
    //         building: {
    //             type: Number
    //         },
    //         machinery: {
    //             type: Number
    //         }
    //     },
    //     business_activities: [],
    //     payment: {
    //         mode: {
    //             type: Number
    //         },
    //         qrtly: {
    //             type: Number
    //         }
    //     }

    // },
    // documents: [],
    // business_insurance: {
    //     provider: {
    //         type: String
    //     },
    //     app_fee: {
    //         type: Number
    //     },
    //     lrf: {
    //         type: Number
    //     },
    //     interest: {
    //         type: Number
    //     },
    //     surcharge: {
    //         type: Number
    //     },
    //     total: {
    //         type: Number
    //     }
    // },
    // payment_info: {
    //     desc: {
    //         type: String
    //     },
    //     amount: {
    //         type: Number
    //     },
    //     method: {
    //         type: String
    //     }
    // },
    // billing_info: {
    //     credit_number: {
    //         type: Number
    //     },
    //     name: {
    //         type: String
    //     },
    //     email: {
    //         type: String
    //     },
    //     contact: {
    //         type: Number
    //     }
    // },
    // progress: {
    //     status: {
    //         type: String
    //         //  Approve
    //         //  Expired
    //         // Pending
    //         // Reject
    //     },
    //     current_task: {
    //         type: String
    //     },
    //     date_modified: {
    //         type: Date,
    //         default: new Date()
    //     },
    //     previous_task: {
    //         type: String
    //     }
    // }
})

module.exports = mongoose.model('permit', PermitModelSchema)
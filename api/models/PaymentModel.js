var mongoose = require('mongoose');

var PaymentModelSchema = new mongoose.Schema({
    application_id: {
        type: String
    },
    transaction_no: {
        type: String
    },
    total_payable: {
        type: Number
    },
    amount_rendered: {
        type: Number
    },
    method: {
        type: String
    },
    mode_of_payment: {
        type: String
    },
    status: {
        type: String
    },
    details: {},
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    payment_mode: {
        type: Number
        /*
         * 0 - A
         * 1 - SA
         * 2 - Q
         */
    },
    payment_info: {
        desc: {
            type: String
        },
        amount: {
            type: Number
        },
        method: {
            type: String
        }
    },
    billing_info: {
        credit_number: {
            type: Number
        },
        name: {
            type: String
        },
        email: {
            type: String
        },
        contact: {
            type: Number
        }
    },
})

module.exports = mongoose.model('payment', PaymentModelSchema)
var mongoose = require('mongoose')
var PaymentModelSchema = new mongoose.Schema({
    method: {
        type: String
    },
    details: {},
    transaction_id: {
        type: Number
    },
    total_payable: {
        type: Number
    },
    amount_rendered: {
        type: Number
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    payment_mode: {
        type: String
        /*
         * A
         * SA
         * Q
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
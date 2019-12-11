var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var PaymentModelSchema = new mongoose.Schema({
    application_id: {
        type: String
    },
    auto_id: {
        type: Number
    },
    transaction_no: {
        type: String
    },
    total_payable: { // Total Amount to be paid
        type: Number
    },
    amount_payable: { // Amount to be paid for this data
        type: Number
    },
    amount_paid: { // Amount Rendered
        type: Number
    },
    method: {
        type: String
        /**
         * creditcard, onlinebanking, overcounter
         */
    },
    mode_of_payment: {
        type: String
        /**
         * A - annual, SA - semiannual, Q - quarterly
         */
    },
    status: {
        type: String,
        default: 'unpaid'
        /**
         * paid, unpaid
         */
    },
    payment_details: {}, // Any Details of payment
    due_date: {
        type: Date
    },
    payment_breakdown: [{
        description: {
            type: String
        },
        fee_type: {
            type: String
            /**
             * application_fees, local_taxes
             */
        },
        amount: {
            type: Number
        }
    }],
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    date_modified: {
        type: Date
    },
    modified_by: {
        type: String
    }
})

PaymentModelSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    callback();
});

PaymentModelSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
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

const plugin = new autoIncrement(PaymentModelSchema, 'payments', options);
// users._nextCount()
//     .then(count => console.log(`The next ID will be ${count}`));
plugin.applyPlugin()
    .then(() => {
        console.log("############### init plugin")
    })
    .catch(e => {
        // Plugin failed to initialise
        console.log("############### init failed: " + e);
    });

module.exports = mongoose.model('payments', PaymentModelSchema)
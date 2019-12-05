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
    application_details: {},
    payment_details: {},
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    }
})

PaymentModelSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
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
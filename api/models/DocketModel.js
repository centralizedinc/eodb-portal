var mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-reworked').MongooseAutoIncrementID;

var DocketSchema = new mongoose.Schema({
    auto_id: {
        type: Number
    },
    reference_no: {
        type: String
    },
    application_id: {
        type: String
    },
    application_type: {
        type: String
    },
    permit: {
        type: String
    },
    permit_code: {
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
    payment_status: {
        type: String
        /**
         * paid
         * partial
         */
    },
    created_by: {
        type: String
    },
    modified_by: {
        type: String
    },
    date_approved: {
        type: Date,
        default: new Date()
    },
    date_rejected: {
        type: Date,
        default: new Date()
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    },
    activities: [{
        approver: {
            type: String
        },
        status: {
            type: Number,
            default: 0
            /**
             * 0 - In Progress
             * 1 - Approved
             * 2 - Rejected
             * 3 - Claimed
             */
        },
        department: {
            type: String
        },
        date_claimed: {
            type: Date
        },
        date_approved: {
            type: Date,
        },
        date_rejected: {
            type: Date
        },
        remarks: {
            type: String
        },
        for_compliance: {
            type: Boolean,
            default: false
        }
    }],
    account_id: {
        type: String
    }
})

DocketSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

DocketSchema.pre('findOneAndUpdate', function (callback) {
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

const plugin = new autoIncrement(DocketSchema, 'dockets', options);
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

module.exports = mongoose.model('dockets', DocketSchema)
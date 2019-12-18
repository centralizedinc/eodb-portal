var mongoose = require('mongoose')
var FeesComputationSchema = new mongoose.Schema({
    permit_type: {
        type: String
    },
    application_type: {
        type: String
    },
    // replace the base amount in {#amount} key
    computation: {
        type: String
    },
    remarks: {
        type: String
    },
    created_by:{
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    modified_by:{
        type: String
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

FeesComputationSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

FeesComputationSchema.pre('findOneAndUpdate', function (callback) {
    console.log('update :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('fees_computations', FeesComputationSchema)
var mongoose = require('mongoose')
var PermitModelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date_created: {
        type: Date
    },
    date_modified: {
        type: Date
    }
})

PermitModelSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

PermitModelSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('permits', PermitModelSchema)
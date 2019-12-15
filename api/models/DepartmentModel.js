var mongoose = require('mongoose')
var DepartmentSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description:{
        type:String
    },
    admin:{
        type:Boolean,
        default:false
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    created_by: {
        type: String
    },
    date_modified: {
        type: Date,
        default: new Date()
    },
    modified_by: {
        type: String
    },
})

DepartmentSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

DepartmentSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('departments', DepartmentSchema)
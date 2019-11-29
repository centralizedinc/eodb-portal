var mongoose = require('mongoose')
var DepartmentDependenciesSchema = new mongoose.Schema({
    permit: {
        type: String
    },
    dependents: [],
    department: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    }
})

DepartmentDependenciesSchema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

DepartmentDependenciesSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('department_dependencies', DepartmentDependenciesSchema)

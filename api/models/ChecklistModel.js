/**
 * 
 * @author abalita@gmail.com
 * @description This model will handle the checklist needed for each office's approval
 * 
 */

var mongoose = require('mongoose')
var schema = new mongoose.Schema({
    department:String,
    permit:String,
    name:String,
    description:String,
    date_created:{
        type:Date,
        default: new Date()
    },
    date_modified:{
        type:Date,
        default: new Date()
    }
})

schema.pre('save', async function (callback) {
    var account = this;
    account.date_created = new Date();
    account.date_modified = new Date();
    callback();
});

module.exports = mongoose.model('application_checklist', schema)
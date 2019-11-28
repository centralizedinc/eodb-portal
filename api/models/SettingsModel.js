"use strict";

var mongoose = require("mongoose");

var SettingsSchema = new mongoose.Schema({
    code: {
        type: String
    },
    value: {
        type: String
    },
    status: {
        type: String,
        default: 'A'
    },
    created_by: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date
    }
});

SettingsSchema.pre('save', function (params) {

})
SettingsSchema.pre('findOneAndUpdate', function (callback) {
    console.log('this :', this._update);
    this.options.new = true;
    this.options.runValidators = true;
    this._update.date_modified = new Date();
    callback();
});
module.exports = mongoose.model("settings", SettingsSchema);
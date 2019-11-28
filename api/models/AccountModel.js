var mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

var AccountModelSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        first: {
            type: String
        },
        middle: {
            type: String
        },
        last: {
            type: String
        }
    },
    token: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    },
    date_modified: {
        type: Date,
        default: new Date()
    },
    avatar: {
        type: String
    },
    method: {}
})

AccountModelSchema.methods.isValidPassword = function (password) {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, this.password, (err, isValid) => {
            if (!err) resolve(isValid)
            else reject(err)
        });
    })
}

module.exports = mongoose.model('account', AccountModelSchema)
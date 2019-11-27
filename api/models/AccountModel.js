var mongoose = require('mongoose')
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

module.exports = mongoose.model('account', AccountModelSchema)
var mongoose = require('mongoose')
var AdminAccountModelSchema = new mongoose.Schema({
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
        type: Date
    },
    avatar: {
        type: String
    },
    task: {
        type: String
    }
})

module.exports = mongoose.model('admin', AdminAccountModelSchema)
var mongoose = require('mongoose')
var TaskModelSchema = new mongoose.Schema({
    name: {
        type: String
    },
    date_created: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('task', TaskModelSchema)
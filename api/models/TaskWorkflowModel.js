var mongoose = require('mongoose')
var TaskWorkflowModelSchema = new mongoose.Schema({
    workflow: [],
    date_created: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('workflow', TaskWorkflowModelSchema)
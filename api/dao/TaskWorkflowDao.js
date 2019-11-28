"use strict";

var model = require('../models/TaskWorkflowModel');

class WorkflowDao {
    static getWorkflow() {
        return model.find({})
    }

    static addWorkflow(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_workflow => {
                    console.log("saved workflow data: " + JSON.stringify(saved_workflow))
                    resolve(saved_workflow)
                })
                .catch(err => {
                    console.log("error this add workflow: " + JSON.stringify(err))
                    reject(saved_workflow)
                })
        })
    }
}

module.exports = WorkflowDao
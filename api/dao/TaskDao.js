"use strict";

var model = require('../models/TaskModel');

class TaskDao {
    static getTask() {
        return model.find({})
    }

    static addTask(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_task => {
                    console.log("saved task data: " + JSON.stringify(saved_task))
                    resolve(saved_task)
                })
                .catch(err => {
                    console.log("error this add task: " + JSON.stringify(err))
                    reject(saved_task)
                })
        })
    }
}

module.exports = TaskDao
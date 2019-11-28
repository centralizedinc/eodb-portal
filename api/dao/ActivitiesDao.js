"use strict";

var model = require('../models/TaskModel');

class TaskDao {
    static getActivity() {
        return model.find({})
    }

    static addActivity(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_activity => {
                    console.log("saved activity data: " + JSON.stringify(saved_activity))
                    resolve(saved_activity)
                })
                .catch(err => {
                    console.log("error this add activity: " + JSON.stringify(err))
                    reject(saved_activity)
                })
        })
    }
}

module.exports = TaskDao
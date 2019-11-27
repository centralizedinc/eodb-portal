"use strict";

const router = require("express").Router();

var TaskDao = require('../dao/TaskDao');

router
    .route('/')
    .get((req, res) => {
        TaskDao.getTask()
            .then((data) => {
                console.log("get task data: " + JSON.stringify(data))
                res.json(data)
            }).catch((err) => {
                console.log("get task error: " + err)
            })
    })
    .post((req, res) => {
        var new_task = req.body
        console.log("new task data: " + JSON.stringify(new_task))
        TaskDao.addTask(new_task)
            .then((task) => {
                console.log("add task data: " + JSON.stringify(task))
                res.json(task)
            })
            .catch((err) => {
                console.log("add task error: " + err)
            })
    })

module.exports = router
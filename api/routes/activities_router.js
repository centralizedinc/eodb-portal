"use strict";

const router = require("express").Router();

var ActivitiesDao = require('../dao/ActivitiesDao');

router
    .route('/')
    .get((req, res) => {
        ActivitiesDao.getActivity()
            .then((data) => {
                console.log("get activity data: " + JSON.stringify(data))
                res.json(data)
            }).catch((err) => {
                console.log("get activity error: " + err)
            })
    })
    .post((req, res) => {
        var new_activity = req.body
        console.log("new activity data: " + JSON.stringify(new_activity))
        ActivitiesDao.addActivity(new_activity)
            .then((activity) => {
                console.log("add activity data: " + JSON.stringify(activity))
                res.json(activity)
            })
            .catch((err) => {
                console.log("add activity error: " + err)
            })
    })

module.exports = router
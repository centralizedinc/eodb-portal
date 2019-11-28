"use strict"
const router = require("express").Router();

var AccountDao = require('../dao/AccountDao')

router
    .route('/')
    .get((req, res) => {
        AccountDao.getAccount()
            .then((data) => {
                console.log("get account data: " + JSON.stringify(data))
                res.json(data)
            })
            .catch((err) => {
                console.log("get account error: " + JSON.stringify(err))
            })
    })
    .post((req, res) => {
        var new_account = req.body
        console.log("create account data: " + JSON.stringify(new_account))
        AccountDao.applyAccount(new_account)
            .then((account) => {
                console.log("created new account data: " + JSON.stringify(account))
                res.json(account)
            })
            .catch((err) => {
                console.log("applying new account error: " + JSON.stringify(err))
            })
    })

module.exports = router
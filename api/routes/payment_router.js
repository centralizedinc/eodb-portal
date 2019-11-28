"use strict";

const router = require("express").Router();

var PaymentDao = require('../dao/PaymentDao');

router
    .route('/')
    .get((req, res) => {
        PaymentDao.getTask()
            .then((data) => {
                console.log("get payment data: " + JSON.stringify(data))
                res.json(data)
            }).catch((err) => {
                console.log("get payment error: " + err)
            })
    })
    .post((req, res) => {
        var new_payment = req.body
        console.log("new payment data: " + JSON.stringify(new_payment))
        PaymentDao.addPayment(new_payment)
            .then((payment) => {
                console.log("add payment data: " + JSON.stringify(payment))
                res.json(payment)
            })
            .catch((err) => {
                console.log("add payment error: " + err)
            })
    })

module.exports = router
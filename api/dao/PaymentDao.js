"use strict";

var model = require('../models/PaymentModel');

class PaymentDao {
    static getPayment() {
        return model.find({})
    }

    static addPayment(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_payment => {
                    console.log("saved payment data: " + JSON.stringify(saved_payment))
                    resolve(saved_payment)
                })
                .catch(err => {
                    console.log("error this add payment: " + JSON.stringify(err))
                    reject(saved_payment)
                })
        })
    }
}

module.exports = PaymentDao
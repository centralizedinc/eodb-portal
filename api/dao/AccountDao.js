"use strict";

var model = require('../models/AccountModel');

class AccountDao {
    static getAccount() {
        return model.find({})
    }

    static applyAccount(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_account => {
                    console.log("saved_account data: " + JSON.stringify(saved_account))
                    resolve(saved_account)
                }).catch(err => {
                    console.log("apply account error: " + JSON.stringify(err))
                    reject(err)
                })


        })
    }
    /**
     * 
     * @param {*} ref_no 
     */
    static getSearch(ref_no) {
        return model.findOne({
            ref_no
        })
    }
}

module.exports = AccountDao
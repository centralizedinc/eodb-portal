"use strict";

var model = require('../models/AdminAccountModel');

class AdminDao {
    static getAdmin() {
        return model.find({})
    }

    static applyAdmin(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_admin => {
                    console.log("saved_admin data: " + JSON.stringify(saved_admin))
                    resolve(saved_admin)
                }).catch(err => {
                    console.log("apply admin error: " + JSON.stringify(err))
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

module.exports = AdminDao
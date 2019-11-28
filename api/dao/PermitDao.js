"use strict";

var model = require('../models/PermitModel');

class PermitDao {
    static getPermit() {
        return model.find({})
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static find(conditions) {
        return model.find(conditions).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {AccountModel} updated_account 
     */
    static modifyById(id, updated_account) {
        return model.findByIdAndUpdate(id, updated_account).exec()
    }

    static applyPermit(details) {
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then(saved_permit => {
                    console.log("saved_permit data: " + JSON.stringify(saved_permit))
                    resolve(saved_permit)
                }).catch(err => {
                    console.log("error this")
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
            application: {

            }
        })
    }
}

module.exports = PermitDao
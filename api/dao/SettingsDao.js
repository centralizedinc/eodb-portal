"use strict";

var model = require('../models/SettingsModel');

class SettingsDao {
    /**
     * @returns {Promise}
     */
    static getSettings() {
        return model.find({}).lean().exec()
    }

    /**
     * @returns {Promise}
     */
    static getActiveSettings() {
        return model.find({
            "status": 'A'
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     */
    static getInActiveSettings() {
        return model.find({
            "status": 'I'
        }).lean().exec()
    }

    static addSettings(details) {
        return (new model(details)).save()
    }

     /**
     * @returns {Promise}
     */
    static findAll() {
        return model.find({}).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} id
     */
    static findOneByID(id) {
        return model.findById(id).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static findOne(conditions) {
        return model.findOne(conditions).lean().exec()
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
     * @param {Object} details 
     */
    static create(details) {
        return (new model(details)).save()
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     * @param {Object} updated_account 
     */
    static modifyById(id, updated_account) {
        return model.findByIdAndUpdate(id, updated_account).exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_account 
     */
    static modifyOne(conditions, updated_account) {
        return model.findOneAndUpdate(conditions, updated_account).exec()
    }
}

module.exports = SettingsDao;
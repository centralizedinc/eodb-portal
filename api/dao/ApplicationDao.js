const model = require('../models/ApplicationModel');

class ApplicationDao {

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
     * @param {String} ref_no
     */
    static findOneByReference(ref_no) {
        return model.findOne({reference_no:ref_no}).lean().exec()
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
     * @param {Object} updated_data 
     */
    static modifyById(id, updated_data) {
        return model.findByIdAndUpdate(id, updated_data).exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_data 
     */
    static modifyOne(conditions, updated_data) {
        return model.findOneAndUpdate(conditions, updated_data).exec()
    }
}

module.exports = ApplicationDao;
const model = require('../../models/references/BarangayModel');

class BarangayDao {

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
     * @param {Object} updated_details
     */
    static modifyById(id, updated_details) {
        return model.findByIdAndUpdate(id, updated_details).exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {Object} updated_details 
     */
    static modifyOne(conditions, updated_details) {
        return model.findOneAndUpdate(conditions, updated_details).exec()
    }
}

module.exports = BarangayDao;
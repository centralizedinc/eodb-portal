const model = require('../models/CedulaPermitModel');

class CedulaPermitDao {

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
        return new Promise((resolve, reject) => {
            (new model(details)).save()
                .then((result) => {
                    const cedula_no = new Date().getTime().toString() + result.auto_id.toString();
                    return this.modifyById(result._id, { cedula_no })
                })
                .then((result) => {
                    resolve(result)
                })
                .catch((err) => {
                    reject(err)
                });
        })
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

module.exports = CedulaPermitDao;
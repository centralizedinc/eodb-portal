const model = require('../models/AccountModel');

class AccountDao {

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
     * @param {String} email 
     */
    static findByEmail(email) {
        console.log("static find by email data: " + JSON.stringify(email))
        return model.findOne({
            email
        }).exec()
    }

    /**
     * @returns {Promise}
     * @param {String} facebook_id 
     */
    static findByFacebookID(facebook_id) {
        return model.findOne({
            facebook_id
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {String} google_id 
     */
    static findByGoogleID(google_id) {
        return model.findOne({
            google_id
        }).lean().exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     */
    static find(conditions) {
        console.log("conditions data: " + JSON.stringify(conditions))
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
     * @param {AccountModel} updated_account 
     */
    static modifyById(id, updated_account) {
        return model.findByIdAndUpdate(id, updated_account).exec()
    }

    /**
     * @returns {Promise}
     * @param {Object} conditions 
     * @param {AccountModel} updated_account 
     */
    static modifyOne(conditions, updated_account) {
        return model.findOneAndUpdate(conditions, updated_account).exec()
    }

    static changePassword(id, account) {
        return new Promise((resolve, reject) => {
            model.findById(id).exec()
                .then(result => {
                    result.updatePassword(account.new_password)
                    return this.modifyById(id, { password: result.password });
                })
                .then(result => {
                    resolve(result)
                })
                .catch(error => {
                    console.error('error: ', error)
                    reject(error)
                })
        })
    }

    /**
     * @returns {Promise}
     * @param {String} user_id 
     * @param {String} password 
     */
    static matchPassword(user_id, password) {
        console.log('Matching password..');
        return new Promise((resolve, reject) => {
            model.findById(user_id).exec()
                .then((user) => {
                    if (user) return user.isValidPassword(password);
                })
                .then((isValid) => {
                    console.log('###isValid :', isValid);
                    resolve(isValid)
                })
                .catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    }
}

module.exports = AccountDao;
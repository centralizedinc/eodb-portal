const model = require('../models/PaymentModel');

var ApplicationSettings = require('../utils/ApplicationSettings');

const axios = require('axios');

class PaymentDao {

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
                    const transaction_no = new Date().getTime().toString() + result.auto_id.toString();
                    console.log('transaction_no :', transaction_no);
                    return this.modifyById(result._id, { transaction_no })
                })
                .then((result) => {
                    console.log('create result :', result);
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

    static payUsingCreditCard(card, payment_details, transaction_details) {
        return new Promise((resolve, reject) => {
            card.number = card.number.replace(/\s+/g, '');
            card.exp_month = parseInt(card.exp_month.replace(/\s+/g, ''));
            const exp_year = card.exp_year.replace(/\s+/g, '');
            card.exp_year = exp_year.length === 4 ? exp_year : parseInt('20' + exp_year);
            card.expiry = undefined;
            console.log('card :', card);
            getPaymentToken(card)
                .then((result) => {
                    console.log('getPaymentToken result.data :', result.data);
                    payment_details.source = result.data.id;
                    return getPaymentCharges(payment_details)
                })
                .then((result) => {
                    console.log('getPaymentCharges result.data :', result.data);
                    transaction_details.payment_details = result.data;
                    return this.create(transaction_details)
                })
                .then((result) => {
                    resolve(result)
                })
                .catch((errors) => {
                    if (errors && errors.response) errors = errors.response.data || errors
                    reject(errors)
                });
        })
    }
}

/**
 * @returns {Promise}
 * @param {Object} card 
 */
function getPaymentToken(card) {
    var card_details = { card };
    return axios({
        method: "post",
        url: ApplicationSettings.getValue('PAYMENT_TOKEN_URL'),
        data: card_details,
        auth: {
            username: ApplicationSettings.getValue('PAYMENT_TOKEN_USERNAME'),
            password: ""
        }
    })
}

/**
 * @returns {Promise}
 * @param {Object} payment_details 
 */
function getPaymentCharges(payment_details) {
    console.log('payment_details :', payment_details);
    console.log('PAYMENT_CHARGES_URL :', ApplicationSettings.getValue('PAYMENT_CHARGES_URL'));
    console.log('PAYMENT_CHARGES_USERNAME :', ApplicationSettings.getValue('PAYMENT_CHARGES_USERNAME'));

    return axios({
        method: "post",
        url: ApplicationSettings.getValue('PAYMENT_CHARGES_URL'),
        data: payment_details,
        auth: {
            username: ApplicationSettings.getValue('PAYMENT_CHARGES_USERNAME'),
            password: ""
        }
    })
}

module.exports = PaymentDao;
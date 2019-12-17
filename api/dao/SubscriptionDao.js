var model = require('../models/SubscriptionModel');

const web_push = require("web-push")
const vapidKeys = {
    publicKey: 'BPkZHUsQThs4Qry2t-4iDqHyneZ-_O09bbToP8vId38cToT8Wod9MOCwmQgefAdMtUfEhMPPankmtMdX-tCq4hU',
    privateKey: 'M8flcuxuqUl5-OVcGHm2IoGXPvBErqjyglcs8V8ymBM',
}
web_push.setVapidDetails(
    'mailto:abalita@centralizedinc.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)

class SubscriptionDao {

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
     * @param {Object} conditions 
     */
    static findByAccountId(id) {
        return model.find({account_id:id}).lean().exec()
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

    static modifyByAccountId(updated_account) {
        return model.findOneAndUpdate({account_id:updated_account.account_id}, updated_account).exec()
    }

    static removeSubscriptionByAccountId(id) {
        return model.remove({account_id: id}).exec()
    }

    static broadcast(message) {
        model.find().exec()
            .then(results => {
                console.log("RESULTS ", JSON.stringify(results))
                results.forEach(sub => {
                    web_push.sendNotification(sub.subscription,  JSON.stringify(message))
                })
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    static push(id, message) {
        console.log('message :', message);
        model.find({
                account_id: id
            }).exec()
            .then(results => {
                results.forEach(sub => {
                    web_push.sendNotification(sub.subscription, JSON.stringify(message))
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

}

module.exports = SubscriptionDao;
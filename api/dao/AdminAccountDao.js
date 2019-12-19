const model = require('../models/AdminAccountModel');

class AdminAccountDao {

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
     * 
     * @param {*} email 
     */
    static findByEmail(email) {
        return model.findOne({
            email
        }).exec()
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

    static changePassword(id, account){
        var admin = {}
        return new Promise((resolve, reject)=>{
            model.findById(id).exec()
            .then(result=>{
                admin = result
                return result.isValidPassword(account.old_password)
            })
            .then(result=>{
                console.log('result::::', result)
                if(result){
                    admin.password=account.new_password                
                    return admin.save()
                }else{
                    return false
                }
                
            })
            .then(result=>{
                if(!result){
                    console.log('saved: ', JSON.stringify(result))
                    reject({error:'invalid password'})
                }else{
                    console.log('saved: ', JSON.stringify(result))
                    resolve(result)
                }
                
            })
            .catch(error=>{
                console.error('error: ',error)
                reject(error)
            })
        })
    }

    static updateSettings(id, settings) {
        return new Promise((resolve, reject)=>{
            model.findById(id).exec()
            .then(result=>{
                console.log(':::: UPDATING: ', JSON.stringify(result))
                result.settings = settings
                return result.save()
            })
            .then(result=>{      
                console.log(':::: UPDATED: ', JSON.stringify(result))          
                resolve(result)
            })
            .catch(error=>{
                console.error('error: ',error)
                reject(error)
            })
        })
    }
}

module.exports = AdminAccountDao;
import axios from "axios";

axios.defaults.baseURL = process.env.VUE_APP_HOME_URI

export default class AccountAPI{

    /** 
     * @param {AccountModel} user 
    */
   static register(new_account){
       console.log("register account API data: " + JSON.stringify(new_account))
       return axios.post("account", new_account)
   }

   /**
     * @returns {Promise}
     * @param {Object} account 
     */
    static signup(account) {
        console.table("signup account API data: " + JSON.stringify(account));
        return axios.post(`auth/signup`, account);
    }

    /**
     * @returns {Promise}
     * @param {Object} details
     */
    static staticsendRegisterInvitation(details) {
        console.log("send register invitation details: " + JSON.stringify(details))
        return axios.post('auth/invitation', details)
    } 

    /**
     * @returns {Promise}
     * @param {Object} id
     */
    static getAccount(id){
        console.log("find account outer api: " + JSON.stringify(id))
        return axios.get(`accounts/${id}`)
    }
}
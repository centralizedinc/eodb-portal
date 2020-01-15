import axios from "axios";

// axios.defaults.baseURL = process.env.VUE_APP_HOME_URI

export default class AccountAPI {
    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /** 
     * @param {AccountModel} user 
     */
    register(new_account) {
        console.log("register account API data: " + JSON.stringify(new_account))
        return axios.post("account", new_account)
    }

    /**
     * @returns {Promise}
     * @param {Object} account 
     */
    signup(account) {
        console.table("signup account API data: " + JSON.stringify(account));
        return axios.post('auth/signup', account);
    }

    /**
     * @returns {Promise}
     * @param {Object} details
     */
    sendRegisterInvitation(details) {
        console.log("send register invitation details: " + JSON.stringify(details))
        return axios.post('auth/invitation', details)
    }

    /**
     * @returns {Promise}
     * @param {Object} id
     */
    getAccount(id) {
        console.log("find account outer api: " + JSON.stringify(id))
        return axios.get(`accounts/${id}`);
    }

    /**
     * @returns {Promise}
     * @param {Object} email
     */
    getAccountProfile(email) {
        console.log("find account profile outer api: " + JSON.stringify(email))
        return axios.get(`accounts/user/profile/${email}`);
    }


    /**
     * @returns {Promise}
     * @param {Object} data
     */
    login(data) {
        console.log('login :', data);
        return axios.post('auth/login', data);
    }

    /**
     * @returns {Promise}
     * @param {Object} code
     */
    confirmAccount(code) {
        console.log('code :', code);
        return axios.get(`auth/confirmation/${code}`);
    }

    /**
     * @returns {Promise}
     * @param {Object} details 
     */
    updateProfile(details) {
        return axios.post('accounts/profile', details);
    }

    changePasswordRequest(password) {
        console.log('password :', password);
        return axios.post("accounts/resetpassword/request", { password });
    }

    forgotPasswordRequest(email) {
        console.log('email :', email);
        return axios.get(`accounts/resetpassword/request?email=${email}`);
    }

    checkPasswordRequest(code) {
        console.log('code :', code);
        return axios.get(`accounts/resetpassword/${code}`);
    }

    resetPassword(code, password) {
        console.log('code :', code);
        console.log('password :', password);
        return axios.post(`accounts/resetpassword/${code}`, password);
    }
}
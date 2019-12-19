import axios from 'axios'

export default class BusinessPermitAPI {
    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    createPermit(data) {
        return axios.post('/permits/business/application', data);
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    getPermit() {
        return axios.get('/permits/business');
    }

    static getTransactions(id) {
        console.log("business permit api data:" + JSON.stringify(id))
        return axios.get(`/permits/business/transactions/${id}`)
    }

    getApplicationByRef(reference_no) {
        console.log('getApplicationByRef reference_no :', reference_no);
        return axios.get(`/permits/business/application/reference/${reference_no}`)
    }

    /**
     * @returns {Promise}
     * @param {String} business_no 
     * @param {Object} data 
     */
    updatePermitByBusinessNo(business_no, data) {
        console.log('business_no :', business_no);
        return axios.post(`/permits/business/epermit/${business_no}`, data);
    }
}
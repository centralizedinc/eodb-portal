import axios from 'axios'

export default class PoliceCleareanceAPI {
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

        return axios.post('/permits/barangay', data);
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    getPermit() {
        return axios.get('/permits/barangay');
    }

    // static getTransactions(id) {
    //     return axios.get(`/permits/business/transactions/${id}`)
    // }

    // getApplicationByRef(reference_no) {
    //     return axios.get(`/permits/business/application/reference/${reference_no}`)
    // }

}
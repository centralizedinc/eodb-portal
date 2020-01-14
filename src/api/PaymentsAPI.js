import axios from "axios";

export default class PaymentsAPI {
    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     * @param {String} id 
     */
    getPayments() {
        console.log('getting payments...');
        return axios.get('/payments/client')
    }

    /**
     * @returns {Promise}
     * @param {String} permit_type
     * @param {String} app_type 
     */
    getFeesComputation(permit_type, app_type) {
        console.log(`getting fees computation by ${permit_type}, ${app_type}`);
        return axios.get(`/fees/computation/${permit_type}/${app_type}`);
    }

    /**
     * @returns {Promise}
     * @param {Array} conditions
     */
    getFeesComputations(conditions) {
        console.log(`getting fees computations ${conditions}`);
        return axios.post("/fees/computation/multiple", conditions);
    }

    /**
     * @returns {Promise}
     * @param {Object} data
     */
    createFeesComputation(data) {
        console.log('computing data :', data);
        return axios.post('/fees/computation', data);
    }

    /**
     * @returns {Promise}
     * @param {String} id
     * @param {Object} data
     */
    updateFeesComputation(id, data) {
        console.log(`computing data ${id}:`, data);
        return axios.post(`/fees/computation/${id}`, data);
    }

    /**
     * @returns {Promise}
     */
    getAllFeesComputation() {
        return axios.get('/fees/computation');
    }

    /**
     * @returns {Promise}
     * @param {String} transaction_no 
     * @param {String} attachment 
     */
    updatePaymentByTransNo(transaction_no, attachment) {
        return axios.post(`/payments/receipt/${transaction_no}`, { attachment })
    }

    /**
     * @returns {Promise}
     * @param {Object} data 
     */
    sendEmailNotification(data) {
        return axios.post('/payments/notify/success', data);
    }
}
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
     */
    getPermitType(){
        return axios.get('permits');
    }

    /**
     * @returns {Promise}
     * @param {String} cedula_no 
     * @param {Object} data 
     */
    updatePermitByCedulaNo(cedula_no, data) {
        console.log('cedula_no :', cedula_no);
        return axios.post(`/permits/cedula/epermit/${cedula_no}`, data);
    }

    /**
     * @returns {Promise}
     * @param {String} police_no 
     * @param {Object} data 
     */
    updatePermitByPoliceNo(police_no, data) {
        console.log('police_no :', police_no);
        return axios.post(`/permits/police/epermit/${police_no}`, data);
    }

    /**
     * @returns {Promise}
     * @param {String} barangay_no 
     * @param {Object} data 
     */
    updatePermitByBarangayNo(barangay_no, data) {
        console.log('barangay_no :', barangay_no);
        return axios.post(`/permits/barangay/epermit/${barangay_no}`, data);
    }

    /**
     * @returns {Promise}
     */
    getPermits(){
        console.log('getting permit records ....');
        return axios.get("/permits/records");
    }
}
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
    createApplication(data) {
        return axios.post('/applications', data);
    }

    /**
     * @returns {Promise}
     */
    getApplications() {
        return axios.get('/applications');
    }

    getApplicationByRef(reference_no) {
        console.log('getApplicationByRef reference_no :', reference_no);
        return axios.get(`/applications/reference/${reference_no}`)
    }

}
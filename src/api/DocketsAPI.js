import axios from "axios";

export default class DocketsAPI {
    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * @returns {Promise}
     */
    getDockets() {
        return axios.get('dockets');
    }

    /**
     * @returns {Promise}
     */
    getDocketsInbox() {
        return axios.get('dockets/inbox');
    }

    /**
     * @returns {Promise}
     */
    getDocketsOutbox() {
        return axios.get('dockets/outbox');
    }

    /**
     * @returns {Promise}
     * @param {String} docket_reference
     */
    claimDocket(docket_reference) {
        return axios.post('dockets/claim', { docket_reference });
    }

    /**
     * @returns {Promise}
     * @param {Object} data
     */
    approveDocket(data) {
        return axios.post('dockets/approve', data);
    }

    /**
     * @returns {Promise}
     * @param {Object} data
     */
    rejectDocket(data) {
        return axios.post('dockets/reject', data);
    }
}
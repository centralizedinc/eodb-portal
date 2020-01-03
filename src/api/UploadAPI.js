import axios from 'axios'

export default class UploadAPI {
    constructor(token) {
        console.log('token :', token);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    /**
     * 
     * @param {String} permit_type 
     * @param {String} account_id 
     * @param {Object} files 
     */
    uploadDocuments(permit_type, account_id, files) {
        console.log('files :', files);
        // Means no attached file
        if (!files) return Promise.resolve();
        // Else upload the attached file
        return axios.post(`/upload?permit=${permit_type}&account_id=${account_id}`, files)
    }

    /**
     * 
     * @param {String} permit_type 
     * @param {String} account_id 
     * @param {Object} files 
     */
    uploadPermitsDocRequired(permit_type, account_id, files) {
        console.log('files :', files);
        // Means no attached file
        if (!files) return Promise.resolve();
        // Else upload the attached file
        return axios.post(`/upload/permits?permit=${permit_type}&account_id=${account_id}`, files)
    }

    /**
     * @returns {Promise}
     * @param {Form Data} file 
     */
    uploadAvatar(file) {
        if (!file) return Promise.resolve();
        return axios.post('upload/avatar', file);
    }

    /**
     * @returns {Promise}
     * @param {String} epermit_no 
     * @param {FormData} form_data 
     */
    uploadPermitDocument(epermit_no, form_data) {
        console.log('#########  epermit_no :', epermit_no);
        if (!form_data) return Promise.resolve();
        else return axios.post(`upload/epermit/${epermit_no}`, form_data);
    }

    /**
     * @returns {Promise}
     * @param {String} transaction_no 
     * @param {String} reference_no 
     * @param {FormData} form_data 
     */
    uploadTransactionReceipt(transaction_no, reference_no, form_data) {
        console.log('#########  transaction_no :', transaction_no);
        console.log('#########  reference_no :', reference_no);
        if (!form_data) return Promise.resolve();
        else return axios.post(`upload/receipt/${reference_no}/${transaction_no}`, form_data);
    }
}
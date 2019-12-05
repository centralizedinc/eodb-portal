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

}
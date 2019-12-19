import axios from "axios";

export default class RolesAPI {
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
    getRoleById(id){
        console.log('getRoleById id :', id);
        return axios.get(`/roles/${id}`)
    }
}
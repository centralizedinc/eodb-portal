import axios from "axios";

export default class DepartmentAPI {
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
    getDepartmentById(id){
        console.log('getDepartmentById id :', id);
        return axios.get(`/departments/${id}`)
    }

    /**
     * @returns {Promise}
     */
    getDepartments(){
        return axios.get('departments');
    }
}
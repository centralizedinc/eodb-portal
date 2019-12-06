import axios from 'axios'

export default class ReferencesAPI {
    // Regions
    static getRegions(){
        return axios.get('/references/regions');
    }


    // Provinces
    static getProvinces(){
        return axios.get('/references/provinces');
    }

    static getProvincesByRegion(code){
        return axios.get(`/references/provinces/region/${code}`);
    }


    // Cities
    static getCities(){
        return axios.get('/references/cities');
    }

    static getCitiesByProvince(code){
        return axios.get(`/references/cities/province/${code}`);
    }

    static getCitiesByCode(code){
        return axios.get(`/references/cities/code/${code}`);
    }


    // Barangay
    static getBarangay(){
        return axios.get('/references/barangay');
    }

    static getBarangayByCity(code){
        return axios.get(`/references/barangay/city/${code}`);
    }

    static getBarangayByCode(code){
        return axios.get(`/references/barangay/code/${code}`);
    }
}
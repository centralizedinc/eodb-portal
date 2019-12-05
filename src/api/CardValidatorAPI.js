import axios from 'axios'

export default class CardValidator {
    constructor(token) {
        console.log('token :', token);
        console.log('process.env.VUE_APP_BASE_API_URI :', process.env.VUE_APP_BASE_API_URI);
        axios.defaults.baseURL = process.env.VUE_APP_BASE_API_URI;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['access_token'] = token;
    }

    validateCard(card){
        console.log('card :', card);
        return axios.post('/creditcard/validate/card', { card });
    }

    validateCVV(cvv, max){
        console.log('cvv :', cvv);
        console.log('max :', max);
        return axios.post('/creditcard/validate/cvv', { cvv, max });
    }

    validateExpiry(expiry){
        console.log('expiry :', expiry);
        return axios.post('/creditcard/validate/expiry', { expiry });
    }
}
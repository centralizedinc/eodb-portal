import CardValidator from "../../api/CardValidatorAPI"
import PaymentsAPI from '../../api/PaymentsAPI';
import UploadAPI from '../../api/UploadAPI'

function initialState() {
    return {
       details:{
           application_fee: '2,500.00',
           insurance:'1,800.00',
           convenience_fee: '50.00',
            total:'4,350.00'
       },
       payments: [],
       fees_computations: []
    }
}

const state = initialState()

const mutations = {
    SET_PAYMENT(state, payload){
        state.details = payload
    },
    SET_PAYMENTS(state, payload) {
        state.payments = payload;
    },
    SET_COMPUTATIONS(state, payload) {
        state.fees_computations = payload;
    },
    RESET(state){
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    VALIDATE_CARD(context, card){
        return new CardValidator(context.rootState.user_session.token).validateCard(card);
    },
    VALIDATE_CVV(context, {cvv, max}){
        return new CardValidator(context.rootState.user_session.token).validateCVV(cvv, max);
    },
    VALIDATE_EXPIRY(context, expiry){
        return new CardValidator(context.rootState.user_session.token).validateExpiry(expiry);
    },
    GET_PAYMENTS(context, refresh) {
        return new Promise((resolve, reject) => {
            if(refresh || !context.state.payments || !context.state.payments.length) {
                new PaymentsAPI(context.rootState.user_session.token).getPayments()
                    .then((result) => {
                        console.log('GET_PAYMENTS result :', result);
                        if(!result.data.errors) {
                            context.commit("SET_PAYMENTS", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_PAYMENTS err :', err);
                        reject(err);
                    });
            } else resolve(context.state.payments)
        })
    },
    GET_FEES_COMPUTATION(context, { permit_type, app_type }) {
        return new PaymentsAPI(context.rootState.user_session.token).getFeesComputation(permit_type, app_type);
    },
    GET_FEES_COMPUTATIONS(context, conditions) {
        return new PaymentsAPI(context.rootState.user_session.token).getFeesComputations(conditions);
    },
    CREATE_FEES_COMPUTATION(context, data) {
        return new PaymentsAPI(context.rootState.user_session.token).createFeesComputation(data);
    },
    UPDATE_FEES_COMPUTATION(context, data) {
        return new PaymentsAPI(context.rootState.user_session.token).updateFeesComputation(data._id, data);
    },
    GET_ALL_FEES_COMPUTATION(context, refresh) {
        return new Promise((resolve, reject) => {
            if(refresh || !context.state.fees_computations || !context.state.fees_computations.length) {
                new PaymentsAPI(context.rootState.user_session.token).getAllFeesComputation()
                    .then((result) => {
                        console.log('GET_ALL_FEES_COMPUTATION result :', result);
                        if(!result.data.errors) {
                            context.commit("SET_COMPUTATIONS", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_ALL_FEES_COMPUTATION err :', err);
                        reject(err);
                    });
            } else resolve(context.state.fees_computations)
        })
    },
    SAVE_RECEIPT_ATTACHMENT(context, { transaction_no, reference_no, form_data }) {
        console.log('#########  transaction_no :', transaction_no);
        console.log('#########  reference_no :', reference_no);
        return new Promise((resolve, reject) => {
            new UploadAPI(context.rootState.user_session.token).uploadTransactionReceipt(transaction_no, reference_no, form_data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result) return new PaymentsAPI(context.rootState.user_session.token).updatePaymentByTransNo(transaction_no, result.data.location)
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_RECEIPT_ATTACHMENT err :', err);
                    reject(err)
                });
        })
    },
    SEND_PAYMENT_EMAIL_NOTIFICATION(context, data){
        return new PaymentsAPI(context.rootState.user_session.token).sendEmailNotification(data);
    }
}

export default {
    state,
    mutations,
    actions
}



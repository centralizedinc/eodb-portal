import CardValidator from "../../api/CardValidatorAPI"

function initialState() {
    return {
       details:{
           application_fee: '2,500.00',
           insurance:'1,800.00',
           convenience_fee: '50.00',
            total:'4,350.00'
       }
    }
}

const state = initialState()

const mutations = {
    SET_PAYMENT(state, payload){
        state.details = payload
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
    }
}

export default {
    state,
    mutations,
    actions
}



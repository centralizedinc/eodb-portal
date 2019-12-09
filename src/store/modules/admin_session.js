import AccountAPI from "../../api/AccountAPI"

function initialState() {
    return {
        admin:{},
        locked:false, 
        for_review:{}
    }
}

const state = initialState()

const mutations = {
    ADMIN_LOGIN(state, payload){
        state.admin = payload;
        state.locked = false;
    },
    ADMIN_LOGOUT(state){
        state.locked = false;
        state.admin = initialState();
    },
    LOCK_SCREEN(state){
        state.locked = true;
    },
    UNLOCK_SCREEN(state){
        state.locked = false;
    },
    REVIEW(state, payload){
        state.for_review = payload;
    },
    
}

const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
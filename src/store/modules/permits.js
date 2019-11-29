import BusinessPermitAPI from '../../api/BusinessPermitAPI';

function initialState() {
    return {
        records: [],
        permits: [],

    }
}

const state = initialState()

const mutations = {
    ADD_TAXES(state, payload) {
        state.records.push(payload)
    },
    GET_PERMITS(state, id) {

    }
}

const actions = {
    CREATE_BUSINESS_PERMIT(context, data){
        return new BusinessPermitAPI(context.rootState.user_session.token).createPermit(data);
    },
    GET_BUSINESS_PERMIT(context, data){
        return new BusinessPermitAPI(context.rootState.user_session.token).getPermit();
    }
}

export default {
    state,
    mutations,
    actions
}
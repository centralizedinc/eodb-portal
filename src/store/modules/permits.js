function initialState() {
    return {
        records: [],
        permits: []

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

}

export default {
    state,
    mutations,
    actions
}
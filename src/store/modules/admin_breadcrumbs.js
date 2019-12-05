
function initialState() {
    return {
        path:['Home']
    }
}

const state = initialState()

const mutations = {
    ADD_BREADCRUMB(state, payload){
        state.path.push(payload)
    },
    
}

const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
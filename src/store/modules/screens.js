
function initialState() {
    return {
        breadcrumbs:['Home'],
        locked_screen:'/admin/app'
    }
}

const state = initialState()

const mutations = {
    ADD_BREADCRUMB(state, payload){
        state.breadcrumbs.push(payload)
    },
    SAVE_SCREEN(state, payload){
        state.locked_screen = payload
    },
    
}

const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
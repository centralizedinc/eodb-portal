
function initialState() {
    return {
        breadcrumbs:[],
        locked_screen:'/admin/app'
    }
}

const state = initialState()

const mutations = {
    DROP_BREADCRUMBS: function (state, payload) {
        
        var index = state.breadcrumbs.map(e => e.name).indexOf(payload.name);
        if (index > -1) {
          state.breadcrumbs.splice(index + 1, state.breadcrumbs.length)
        } else {
          state.breadcrumbs.push(payload)  
        }
        console.log('dropping breadcrumbs state::::', state.breadcrumbs)
      },
    ADD_BREADCRUMB(state, payload){
        state.breadcrumbs.push(payload)
        
    },
    SAVE_SCREEN(state, payload){
        state.locked_screen = payload
    },
    ADMIN_LOGOUT(state){
        console.log("calling this.ADMIN_LOGOUT..")
        state.breadcrumbs = []
    }
    
}

const actions = {
    
}

export default {
    state,
    mutations,
    actions
}
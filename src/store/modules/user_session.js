function initialState() {
    return {
        user:{
            fname:'',
            lname:'',
            avatar:'',
            email:''
        },
        token: ''
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, payload){
        state.user = payload;
    },
    FB_LOGIN(state, payload){
        console.log("fb login payload data: " + JSON.stringify(payload))
        // state.user.fname = payload.profile.name.givenName
        // state.user.lname = payload.profile.name.familyName
        // state.user.email = payload.profile.emails[0].value
        // state.user.avatar = payload.profile.photos[0].value

        state.user.fname = payload.account.name.first
        state.user.lname = payload.account.name.last
        state.user.email = payload.account.email
        state.user.avatar = payload.account.avatar.location
    },
    GOOGLE_LOGIN(state, payload){
        // state.user.fname = payload.profile.name.givenName
        // state.user.lname = payload.profile.name.familyName
        // state.user.email = payload.profile.emails[0].value
        // state.user.avatar = payload.profile.photos[0].value
        state.user.fname = payload.account.name.first
        state.user.lname = payload.account.name.last
        state.user.email = payload.account.email
        state.user.avatar = payload.account.avatar.location
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}
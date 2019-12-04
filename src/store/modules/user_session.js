import AccountAPI from "../../api/AccountAPI"

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
        state.user.token = payload.account.session_token

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
        state.user.token = payload.account.session_token
    },
    
}

const actions = {
    SIGN_UP(context, user_data){
        return new Promise ((resolve, reject) => {
            var account_api = null
            // AccountAPI.register(user_data)
            AccountAPI.signup(user_data)
            .then((result) => {
             console.log("account register store result: " + JSON.stringify(result))
             account_api = result              
             return AccountAPI.sendRegisterInvitation(result)
            })
            .then((result) => {
                console.log("account_api: " + JSON.stringify(account_api))
                console.log("account api send register invitation result data: " + JSON.stringify(result))
                resolve(account_api)                 
            })
            .catch((err) => {
                console.log("account registration error")
                reject(err)
            });
        })
    },
    FIND_ACCOUNT(context, id){
        return new Promise ((resolve, reject) => {
            console.log("find account id data: " + JSON.stringify(id))
            AccountAPI.getAccount(id)
            .then((result) => {
                console.log("find account result data: " + JSON.stringify(result))
                resolve(result)
            })
            .catch((err) => {
                console.log("account find error: " + JSON.stringify(err))
                reject(err)
            });
        })
    }
}

export default {
    state,
    mutations,
    actions
}
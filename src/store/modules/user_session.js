import AccountAPI from "../../api/AccountAPI"
import UploadAPI from "../../api/UploadAPI";

function initialState() {
    return {
        user: {},
        token: ''
    }
}

const state = initialState()

const mutations = {
    LOGIN(state, payload) {
        state.user = payload.account;
        state.token = payload.token;
    },
    UPDATE_USER(state, user) {
        state.user = user;
    },
    FB_LOGIN(state, payload) {
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
    GOOGLE_LOGIN(state, payload) {
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
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    SIGN_UP(context, user_data) {
        return new Promise((resolve, reject) => {
            new AccountAPI(context.state.token).signup(user_data)
                .then((result) => {
                    console.log("account register store result: " + JSON.stringify(result))
                    if (result.data.error) reject(result.data.error);
                    else resolve(result.data.model)
                    //  return new AccountAPI(context.state.token).sendRegisterInvitation(result)
                    // })
                    // .then((result) => {
                    //     console.log("account_api: " + JSON.stringify(account_api))
                    //     console.log("account api send register invitation result data: " + JSON.stringify(result))

                })
                .catch((err) => {
                    console.log("account registration error :", err)
                    reject(err)
                });
        })
    },
    FIND_ACCOUNT(context, id) {
        return new Promise((resolve, reject) => {
            console.log("find account id data: " + JSON.stringify(id))
            // getAccountProfile
            // getAccount
            new AccountAPI(context.state.token).getAccount(id)
                .then((result) => {
                    console.log("find account result data: " + JSON.stringify(result))
                    resolve(result)
                })
                .catch((err) => {
                    console.log("account find error: " + JSON.stringify(err))
                    reject(err)
                });
        })
    },
    LOGIN(context, data) {
        return new Promise((resolve, reject) => {
            new AccountAPI(null).login(data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (!result.data.error) {
                        context.commit("LOGIN", result.data.model);
                        resolve(result.data.model);
                    } else {
                        reject(result.data.error);
                    }
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    CONFIRM_ACCOUNT(context, code) {
        return new AccountAPI(null).confirmAccount(code);
    },
    UPDATE_PROFILE(context, { file, details }) {
        return new Promise((resolve, reject) => {
            new UploadAPI(context.state.token)
                .uploadAvatar(file)
                .then((result) => {
                    console.log('UPDATE_PROFILE avatar result :', result);
                    if (result && result.data) {
                        details.avatar = result.data.location
                    }
                    return new AccountAPI(context.state.token).updateProfile(details)
                })
                .then((result) => {
                    console.log('UPDATE_PROFILE result :', result);
                    if (!result.data.errors) {
                        context.commit('UPDATE_USER', result.data);
                        resolve(result.data)
                    } else reject(result.data.errors);
                }).catch((err) => {
                    console.log('UPDATE_PROFILE err :', err);
                    reject(err);
                });
        })
    },
    LOGOUT(context) {
        context.commit('RESET');
    },
    CHANGE_PASSWORD_REQUEST(context, password) {
        return new Promise((resolve, reject) => {
            new AccountAPI(context.state.token).changePasswordRequest(password)
                .then((result) => {
                    console.log('###CHANGE_PASSWORD_REQUEST result.data :', result.data);
                    if (!result.data.error && result.data.isValid) {
                        resolve(result.data);
                    } else {
                        reject(result.data.error || result.data)
                    }
                }).catch((err) => {
                    console.log('###CHANGE_PASSWORD_REQUEST err :', err);
                    reject(err)
                });
        })
    },
    FORGOT_PASSWORD_REQUEST(context, email) {
        return new Promise((resolve, reject) => {
            new AccountAPI(null).forgotPasswordRequest(email)
                .then((result) => {
                    console.log('###FORGOT_PASSWORD_REQUEST result.data :', result.data);
                    if (!result.data.error && result.data.isValid) {
                        resolve(result.data);
                    } else {
                        reject(result.data.error || result.data)
                    }
                }).catch((err) => {
                    console.log('###FORGOT_PASSWORD_REQUEST err :', err);
                    reject(err)
                });
        })
    },
    CHECK_PASSWORD_RESET(context, code) {
        return new Promise((resolve, reject) => {
            new AccountAPI(null).checkPasswordRequest(code)
                .then((result) => {
                    console.log('###CHECK_PASSWORD_RESET result.data :', result.data);
                    if (!result.data.error && result.data.isValid) {
                        resolve(result.data);
                    } else {
                        reject(result.data.error || result.data)
                    }
                }).catch((err) => {
                    console.log('###CHECK_PASSWORD_RESET err :', err);
                    reject(err)
                });
        })
    },
    RESET_PASSWORD(context, { code, password }) {
        return new Promise((resolve, reject) => {
            new AccountAPI(context.state.token).resetPassword(code, password)
                .then((result) => {
                    console.log('###RESET_PASSWORD result.data :', result.data);
                    if (!result.data.error && result.data.success) {
                        resolve(result.data);
                    } else {
                        reject(result.data.error || result.data)
                    }
                }).catch((err) => {
                    console.log('###RESET_PASSWORD err :', err);
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
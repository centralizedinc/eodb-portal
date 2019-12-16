import DocketsAPI from '../../api/DocketsAPI';
import BusinessPermitAPI from '../../api/BusinessPermitAPI';

function initialState() {
    return {
        dockets: [],
        draft_apps: [],
        dockets_inbox: [],
        dockets_outbox: []
    }
}

const state = initialState()

const mutations = {
    SET_DOCKETS(state, data) {
        state.dockets = data;
    },
    ADD_DRAFT_APPS(state, data) {
        state.draft_apps.push(data);
    },
    REMOVE_DRAFT_APPS(state, index) {
        var drafts = state.draft_apps;
        drafts.splice(index, 1);
        state.draft_apps = drafts;
    },
    RESET(state) {
        // Object.keys(state).forEach(key => {
        //     state[key] = initialState()[key];
        // })
        state.dockets = initialState().dockets;
    },
    SET_DOCKETS_INBOX(state, data) {
        state.dockets_inbox = data;
    },
    SET_DOCKETS_OUTBOX(state, data) {
        state.dockets_outbox = data;
    }
}

const actions = {
    GET_DOCKETS(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.dockets || !context.state.dockets.length) {
                new DocketsAPI(context.rootState.user_session.token).getDockets()
                    .then((result) => {
                        context.commit('SET_DOCKETS', result.data);
                        resolve(result.data);
                    }).catch((err) => {
                        console.log('GET_DOCKETS err :', err);
                        reject(err)
                    });
            } else resolve(context.state.dockets)
        })
    },
    GET_APPLICATION_BY_REF(context, { type, reference_no }) {
        return new Promise((resolve, reject) => {
            if (!type || !reference_no) return reject("Invalid Request");
            console.log('type :', type);
            console.log('reference_no :', reference_no);
            if (type === 'business') {
                new BusinessPermitAPI(context.rootState.user_session.token)
                    .getApplicationByRef(reference_no)
                    .then((result) => {
                        console.log('result :', result);
                        if (result.data && !result.data.errors) {
                            resolve(result.data);
                        } else
                            reject(result.data.errors);
                    }).catch((err) => {
                        console.log('getApplicationByRef err :', err);
                        reject(err)
                    });
            }
            else return reject("Invalid Request");
        })
    },
    GET_DOCKETS_INBOX(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.dockets_inbox || !context.state.dockets_inbox.length) {
                new DocketsAPI(context.rootState.admin_session.token).getDocketsInbox()
                    .then((result) => {
                        console.log('result.data :', result.data);
                        if (!result.data.errors) {
                            context.commit("SET_DOCKETS_INBOX", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_DOCKETS_INBOX err :', err);
                        reject({ errors: err })
                    });
            } else resolve(context.state.dockets_inbox)
        })
    },
    GET_DOCKETS_OUTBOX(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.dockets_outbox || !context.state.dockets_outbox.length) {
                new DocketsAPI(context.rootState.admin_session.token).getDocketsOutbox()
                    .then((result) => {
                        console.log('GET_DOCKETS_OUTBOX result.data :', result.data);
                        if (!result.data.errors) {
                            context.commit("SET_DOCKETS_OUTBOX", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_DOCKETS_OUTBOX err :', err);
                        reject({ errors: err })
                    });
            } else resolve(context.state.dockets_outbox)
        })
    },
    CLAIM_DOCKET(context, docket_reference){
        return new DocketsAPI(context.rootState.admin_session.token).claimDocket(docket_reference);
    },
    APPROVE_DOCKET(context, {docket_reference, remarks}){
        return new DocketsAPI(context.rootState.admin_session.token).approveDocket({docket_reference, remarks});
    },
    REJECT_DOCKET(context, {docket_reference, remarks}){
        return new DocketsAPI(context.rootState.admin_session.token).rejectDocket({docket_reference, remarks});
    }
}

export default {
    state,
    mutations,
    actions
}
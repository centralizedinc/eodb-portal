import DocketsAPI from '../../api/DocketsAPI';
import BusinessPermitAPI from '../../api/BusinessPermitAPI';
import ApplicationAPI from '../../api/ApplicationAPI';

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
    ADMIN_LOGOUT(state) {
        state.dockets_inbox = initialState().dockets_inbox;
        state.dockets_outbox = initialState().dockets_outbox;
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
    GET_APPLICATION_BY_REF(context, reference_no) {
        return new Promise((resolve, reject) => {
            if (!reference_no) return reject("Invalid Request");
            console.log('reference_no :', reference_no);
            new ApplicationAPI(context.rootState.user_session.token)
                .getApplicationByRef(reference_no)
                .then((result) => {
                    console.log('GET_APPLICATION_BY_REF result :', result);
                    if (result.data && !result.data.errors) {
                        resolve(result.data.details);
                    } else
                        reject(result.data.errors);
                }).catch((err) => {
                    console.log('GET_APPLICATION_BY_REF err :', err);
                    reject(err)
                });
            // if (type === 'business') {
            //     new BusinessPermitAPI(context.rootState.user_session.token)
            //         .getApplicationByRef(reference_no)
            //         .then((result) => {
            //             console.log('result :', result);
            //             if (result.data && !result.data.errors) {
            //                 resolve(result.data);
            //             } else
            //                 reject(result.data.errors);
            //         }).catch((err) => {
            //             console.log('getApplicationByRef err :', err);
            //             reject(err)
            //         });
            // }
            // else return reject("Invalid Request");
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
    CLAIM_DOCKET(context, docket_reference) {
        return new DocketsAPI(context.rootState.admin_session.token).claimDocket(docket_reference);
    },
    UNCLAIM_DOCKET(context, docket_reference) {
        return new DocketsAPI(context.rootState.admin_session.token).unclaimDocket(docket_reference);
    },
    APPROVE_DOCKET(context, data) {
        return new DocketsAPI(context.rootState.admin_session.token).approveDocket(data);
    },
    REJECT_DOCKET(context, data) {
        return new DocketsAPI(context.rootState.admin_session.token).rejectDocket(data);
    }
}

export default {
    state,
    mutations,
    actions
}
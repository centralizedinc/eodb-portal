import DocketsAPI from '../../api/DocketsAPI';
import BusinessPermitAPI from '../../api/BusinessPermitAPI';

function initialState() {
    return {
        dockets: [],
        draft_apps: []
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
    }
}

export default {
    state,
    mutations,
    actions
}
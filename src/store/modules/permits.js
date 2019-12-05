import BusinessPermitAPI from '../../api/BusinessPermitAPI';
import UploadAPI from '../../api/UploadAPI';

function initialState() {
    return {
        records: [],
        permits: [],

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
    CREATE_BUSINESS_PERMIT(context, { details, files }) {
        return new Promise((resolve, reject) => {
            console.log('details :', details);
            console.log('files :', files);
            new UploadAPI(context.rootState.user_session.token)
                .uploadPermitsDocRequired('business', context.rootState.user_session.user._id, files)
                .then((result) => {
                    console.log('result upload :', result);
                    if(result && result.data)details.attachments = result.data;
                    return new BusinessPermitAPI(context.rootState.user_session.token).createPermit(details);
                })
                .then((result) => {
                    console.log('Saving permit result :', result);
                    resolve(result.data);
                })
                .catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    },
    GET_BUSINESS_PERMIT(context, data) {
        return new BusinessPermitAPI(context.rootState.user_session.token).getPermit();
    }
}

export default {
    state,
    mutations,
    actions
}
import BusinessPermitAPI from '../../api/BusinessPermitAPI';
import PoliceClearanceAPI from '../../api/PoliceClearanceAPI';
import BarangayClearanceAPI from '../../api/BarangayClearanceAPI';
import CedulaAPI from '../../api/CedulaAPI';


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
    SET_PERMITS(state, data) {
        state.permits = data;
    }
}

const actions = {
    CREATE_BUSINESS_PERMIT(context, {
        details,
        files
    }) {
        return new Promise((resolve, reject) => {
            console.log('details :', details);
            console.log('files :', files);
            var application = {};
            new UploadAPI(context.rootState.user_session.token)
                .uploadPermitsDocRequired('business', context.rootState.user_session.user._id, files)
                .then((result) => {
                    details.data.attachments = details.data.attachments.filter(
                        v => v.files && typeof v.files[0] === "string"
                    );
                    if (result && result.data) {
                        Object.keys(result.data).forEach(doc_type => {
                            console.log('result.data[doc_type] :', result.data[doc_type]);
                            details.data.attachments.push({
                                doc_type,
                                files: result.data[doc_type].map(v => v.location)
                            })
                        })
                    }
                    console.log('details2 :', details);
                    return new BusinessPermitAPI(context.rootState.user_session.token).createPermit(details);
                })
                .then((result) => {
                    console.log('Saving permit result :', result);
                    application = result.data;
                    return context.dispatch("GET_DOCKETS", true);
                })
                .then((result) => {
                    resolve(application);
                })
                .catch((err) => {
                    console.log('err :', err);
                    reject(err)
                });
        })
    },
    GET_BUSINESS_PERMIT(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.permits || !context.state.permits.length) {
                new BusinessPermitAPI(context.rootState.user_session.token)
                    .getPermit()
                    .then((result) => {
                        if (!result.data.errors) {
                            context.commit("SET_PERMITS", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors);
                    }).catch((err) => {
                        console.log("GET_BUSINESS_PERMIT err:", err);
                        reject(err);
                    });
            } else resolve(context.state.permits);
        })
    },
    // Police Clearance
    CREATE_POLICE_CLEARANCE(context, {
        details,
        files
    }) {
        return new Promise((resolve, reject) => {
            console.log('details PC:', details);
            console.log('files PC:', files);
            var application = {};
            // new UploadAPI(context.rootState.user_session.token)
            //     .uploadPermitsDocRequired('police', context.rootState.user_session.user._id, files)
            //     .then((result) => {
            //         console.log("result upload permit doc required: " + JSON.stringify(result))
            //     })
            new PoliceClearanceAPI(context.rootState.user_session.token).createPermit(details.data)
                .then((result) => {

                    console.log("PoliceClearanceAPI data: " + JSON.stringify(result))
                    resolve(result)
                })
        })
    },
    // Barangay Clearance
    CREATE_BARANGAY_CLEARANCE(context, {
        details,
        files
    }) {
        return new Promise((resolve, reject) => {
            console.log('details PC:', details);
            console.log('files PC:', files);
            var application = {};
            // new UploadAPI(context.rootState.user_session.token)
            //     .uploadPermitsDocRequired('police', context.rootState.user_session.user._id, files)
            //     .then((result) => {
            //         console.log("result upload permit doc required: " + JSON.stringify(result))
            //     })
            new BarangayClearanceAPI(context.rootState.user_session.token).createPermit(details.data)
                .then((result) => {

                    console.log("BarangayClearanceAPI data: " + JSON.stringify(result))
                    resolve(result)
                })
        })
    },
    // Cedula
    CREATE_CTC(context, {
        details,
        files
    }) {
        return new Promise((resolve, reject) => {
            console.log('details PC:', details);
            console.log('files PC:', files);
            var application = {};
            // new UploadAPI(context.rootState.user_session.token)
            //     .uploadPermitsDocRequired('police', context.rootState.user_session.user._id, files)
            //     .then((result) => {
            //         console.log("result upload permit doc required: " + JSON.stringify(result))
            //     })
            new CedulaAPI(context.rootState.user_session.token).createPermit(details.data)
                .then((result) => {

                    console.log("CedulaAPI data: " + JSON.stringify(result))
                    resolve(result)
                })
        })
    }
}

export default {
    state,
    mutations,
    actions
}
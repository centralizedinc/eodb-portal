import BusinessPermitAPI from '../../api/BusinessPermitAPI';
import PoliceClearanceAPI from '../../api/PoliceClearanceAPI';
import BarangayClearanceAPI from '../../api/BarangayClearanceAPI';
import CedulaAPI from '../../api/CedulaAPI';


import UploadAPI from '../../api/UploadAPI';
import PermitsAPI from '../../api/PermitsAPI';
import ApplicationAPI from '../../api/ApplicationAPI';

function initialState() {
    return {
        records: [],
        permits: [],
        filing_permit: {},
        permit_types: [],
        permits_records: []
    }
}

const state = initialState()

const mutations = {
    ADD_TAXES(state, payload) {
        state.records.push(payload)
    },
    SET_PERMITS(state, data) {
        state.permits = data;
    },
    SET_FILING_PERMIT(state, data) {
        state.filing_permit = data;
    },
    SET_PERMIT_TYPES(state, data) {
        state.permit_types = data;
    },
    SET_PERMITS_RECORDS(state, data) {
        state.permits_records = data;
    },
    RESET(state) {
        Object.keys(state).forEach(key => {
            state[key] = initialState()[key];
        })
    }
}

const actions = {
    CREATE_APPLICATION(context, { details, files }) {
        return new Promise((resolve, reject) => {
            var application = {};
            new UploadAPI(context.rootState.user_session.token)
                .uploadPermitsDocRequired(details.data.permit_type, context.rootState.user_session.user._id, files)
                .then((result) => {
                    details.data.attachments = details.data.attachments.filter(
                        v => v.files && typeof v.files[0] === "string"
                    );
                    if (result && result.data) {
                        Object.keys(result.data).forEach(doc_type => {
                            console.log('result.data[doc_type] :', result.data[doc_type]);
                            details.data.attachments.push({
                                doc_type,
                                files: result.data[doc_type].map(v => { return { url: v.location, type: v.contentType } })
                            })
                        })
                    }
                    console.log('details2 :', details);
                    return new ApplicationAPI(context.rootState.user_session.token).createApplication(details);
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
    SAVE_EPERMIT_ATTACHMENT(context, { business_no, form_data }) {
        console.log('#########  business_no :', business_no);
        return new Promise((resolve, reject) => {
            new UploadAPI(context.rootState.user_session.token).uploadPermitDocument(business_no, form_data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result) return new BusinessPermitAPI(context.rootState.user_session.token).updatePermitByBusinessNo(business_no, { url: result.data.location, type: result.data.contentType })
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_EPERMIT_ATTACHMENT err :', err);
                    reject(err)
                });
        })
    },
    SAVE_CEDULA_EPERMIT_ATTACHMENT(context, { cedula_no, form_data }) {
        console.log('#########  cedula_no :', cedula_no);
        return new Promise((resolve, reject) => {
            new UploadAPI(context.rootState.user_session.token).uploadPermitDocument(cedula_no, form_data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result) return new PermitsAPI(context.rootState.user_session.token)
                        .updatePermitByCedulaNo(cedula_no, { url: result.data.location, type: result.data.contentType })
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_CEDULA_EPERMIT_ATTACHMENT err :', err);
                    reject(err)
                });
        })
    },
    SAVE_BARANGAY_EPERMIT_ATTACHMENT(context, { barangay_no, form_data }) {
        console.log('#########  barangay_no :', barangay_no);
        return new Promise((resolve, reject) => {
            new UploadAPI(context.rootState.user_session.token).uploadPermitDocument(barangay_no, form_data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result) return new PermitsAPI(context.rootState.user_session.token)
                        .updatePermitByBarangayNo(barangay_no, { url: result.data.location, type: result.data.contentType })
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_BARANGAY_EPERMIT_ATTACHMENT err :', err);
                    reject(err)
                });
        })
    },
    SAVE_POLICE_EPERMIT_ATTACHMENT(context, { police_no, form_data }) {
        console.log('#########  police_no :', police_no);
        return new Promise((resolve, reject) => {
            new UploadAPI(context.rootState.user_session.token).uploadPermitDocument(police_no, form_data)
                .then((result) => {
                    console.log('result.data :', result.data);
                    if (result) return new PermitsAPI(context.rootState.user_session.token)
                        .updatePermitByPoliceNo(police_no, { url: result.data.location, type: result.data.contentType })
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_POLICE_EPERMIT_ATTACHMENT err :', err);
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
    GET_PERMIT_TYPES(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.permit_types || !context.state.permit_types.length) {
                new PermitsAPI(context.rootState.user_session.token).getPermitType()
                    .then((result) => {
                        console.log('GET_PERMIT_TYPES result :', result);
                        if (!result.data.errors) {
                            context.commit("SET_PERMIT_TYPES", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_PERMIT_TYPES err :', err);
                        reject({ errors: err })
                    });
            } else resolve(context.state.permit_types)
        });
    },
    GET_PERMITS(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.permits_records || !context.state.permits_records.length) {
                new PermitsAPI(context.rootState.user_session.token).getPermits()
                    .then((result) => {
                        console.log('GET_PERMITS result :', result);
                        if (!result.data.errors) {
                            context.commit("SET_PERMITS_RECORDS", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_PERMITS err :', err);
                        reject({ errors: err })
                    });
            } resolve(context.state.permits_records)
        });
    }
}

export default {
    state,
    mutations,
    actions
}
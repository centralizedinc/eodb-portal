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
        permit_types: []
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
                                files: result.data[doc_type].map(v => v.location)
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
                    if (result) return new BusinessPermitAPI(context.rootState.user_session.token).updatePermitByBusinessNo(business_no, { attachment: result.data.location })
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
                        .updatePermitByCedulaNo(cedula_no, { attachment: result.data.location })
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
                        .updatePermitByBarangayNo(barangay_no, { attachment: result.data.location })
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
                        .updatePermitByPoliceNo(police_no, { attachment: result.data.location })
                })
                .then((result) => {
                    resolve(result);
                }).catch((err) => {
                    console.log('SAVE_POLICE_EPERMIT_ATTACHMENT err :', err);
                    reject(err)
                });
        })
    },
    CREATE_BUSINESS_PERMIT(context, { details, files }) {
        return new Promise((resolve, reject) => {
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
    GET_PERMIT_TYPES(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.filing_permit || !context.state.filing_permit.length) {
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
            } resolve(context.state.filing_permit)
        });
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
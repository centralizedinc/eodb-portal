import AccountAPI from "../../api/AccountAPI"
import DepartmentAPI from '../../api/DepartmentAPI';
import RoleAPI from '../../api/RolesAPI';
import DocketsAPI from "../../api/DocketsAPI";
import UploadAPI from "../../api/UploadAPI";

function initialState() {
    return {
        admin: {},
        token: "",
        locked: false,
        for_review: {},
        department: {},
        checklist: [],
        role: {}
    }
}

const state = initialState()

const mutations = {
    ADMIN_LOGIN(state, payload) {
        state.admin = payload;
        state.token = payload.token;
        state.locked = false;
    },
    ADMIN_LOGOUT(state) {
        state.locked = false;
        state.token = "";
        state.admin = initialState();
        state.for_review = {};
        state.department = {};
        state.checklist = [];
        state.role = {};
    },
    LOCK_SCREEN(state) {
        state.locked = true;
    },
    UNLOCK_SCREEN(state) {
        state.locked = false;
    },
    REVIEW(state, payload) {
        state.for_review = payload;
    },
    SET_DEPARTMENT(state, payload) {
        state.department = payload;
    },
    SET_CHECKLIST_BY_DEPARTMENT(state, payload) {
        state.checklist = payload;
    },
    SET_ROLE(state, payload) {
        state.role = payload;
    }
}

const actions = {
    UPDATE_ADMIN_PROFILE(context, {file, details}){
        return new Promise((resolve, reject) => {
            new UploadAPI(context.state.token)
                .uploadAvatar(file)
                .then((result) => {
                    console.log('UPDATE_ADMIN_PROFILE avatar result :', result);
                    if (result && result.data) {
                        details.avatar = result.data.location
                    }
                    return new AccountAPI(context.state.token).updateProfileAdmin(details)
                })
                .then((result) => {
                    console.log('UPDATE_ADMIN_PROFILE result :', result);
                    if (!result.data.errors) {
                        // context.commit('UPDATE_USER', result.data);
                        resolve(result.data)
                    } else reject(result.data.errors);
                }).catch((err) => {
                    console.log('UPDATE_ADMIN_PROFILE err :', err);
                    reject(err);
                });
        })     
    },
    GET_ADMIN_DEPARTMENT(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.department || !Object.keys(context.state.department).length) {
                new DepartmentAPI(context.state.token).getDepartmentById(context.state.admin.department)
                    .then((result) => {
                        console.log('GET_ADMIN_DEPARTMENT result :', result);
                        if (!result.data.errors) {
                            context.commit("SET_DEPARTMENT", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_ADMIN_DEPARTMENT err :', err);
                        reject(err);
                    });
            } else resolve(context.state.department)
        })
    },
    GET_ADMIN_ROLE(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.role || !Object.keys(context.state.role).length) {
                new RoleAPI(context.state.token).getRoleById(context.state.admin.role)
                    .then((result) => {
                        console.log('GET_ADMIN_ROLE result :', result);
                        if (!result.data.errors) {
                            context.commit("SET_ROLE", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_ADMIN_ROLE err :', err);
                        reject(err);
                    });
            } else resolve(context.state.role)
        })
    },
    GET_CHECKLIST_BY_DEPARTMENT(context, refresh) {
        return new Promise((resolve, reject) => {
            if (refresh || !context.state.checklist || !context.state.checklist.length) {
                new DocketsAPI(context.state.token).getChecklistByDepartment()
                    .then((result) => {
                        console.log('GET_CHECKLIST_BY_DEPARTMENT result :', result);
                        if (!result.data.errors) {
                            context.commit("SET_CHECKLIST_BY_DEPARTMENT", result.data);
                            resolve(result.data);
                        } else reject(result.data.errors)
                    }).catch((err) => {
                        console.log('GET_CHECKLIST_BY_DEPARTMENT err :', err);
                        reject(err);
                    });
            } else resolve(context.state.checklist)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
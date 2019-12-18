import AccountAPI from "../../api/AccountAPI"
import DepartmentAPI from '../../api/DepartmentAPI';

function initialState() {
    return {
        admin:{},
        token: "",
        locked:false, 
        for_review:{},
        department: {}
    }
}

const state = initialState()

const mutations = {
    ADMIN_LOGIN(state, payload){
        state.admin = payload;
        state.token = payload.token;
        state.locked = false;
    },
    ADMIN_LOGOUT(state){
        state.locked = false;
        state.token = "";
        state.admin = initialState();
        state.for_review = {};
        state.department = {};
    },
    LOCK_SCREEN(state){
        state.locked = true;
    },
    UNLOCK_SCREEN(state){
        state.locked = false;
    },
    REVIEW(state, payload){
        state.for_review = payload;
    },
    SET_DEPARTMENT(state, payload){
        state.department = payload;
    }
}

const actions = {
    GET_ADMIN_DEPARTMENT(context, refresh){
        return new Promise((resolve, reject) => {
            if(refresh || !context.state.department || !Object.keys(context.state.department).length) {
                new DepartmentAPI(context.state.token).getDepartmentById(context.state.admin.department)
                .then((result) => {
                    console.log('GET_ADMIN_DEPARTMENT result :', result);
                    if(!result.data.errors) {
                        context.commit("SET_DEPARTMENT", result.data);
                        resolve(result.data);
                    } else reject(result.data.errors)
                }).catch((err) => {
                    console.log('GET_ADMIN_DEPARTMENT err :', err);
                    reject(err);
                });
            } else resolve(context.state.department)
        })
    }
}

export default {
    state,
    mutations,
    actions
}
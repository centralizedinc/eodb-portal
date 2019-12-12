import ReferencesAPI from "../../api/ReferencesAPI";

function initialState() {
    return {
        regions: [],
        provinces: []
    }
}

const state = initialState()

const mutations = {
    SET_REGIONS(state, data) {
        state.regions = data;
    },
    SET_PROVINCES(state, data) {
        state.provinces = data;
    }
}

const actions = {
    GET_REGIONS(context, refresh) {
        return new Promise((resolve, reject) => {
            if (!context.state.regions || !context.state.regions.length || refresh) {
                ReferencesAPI.getRegions()
                    .then((result) => {
                        context.commit('SET_REGIONS', result.data)
                        resolve(result.data)
                    }).catch((err) => {
                        reject(err)
                    });
            } else resolve(context.state.regions);
        })
    },
    GET_PROVINCES(context, refresh) {
        return new Promise((resolve, reject) => {
            if (!context.state.provinces || !context.state.provinces.length || refresh) {
                ReferencesAPI.getProvinces()
                    .then((result) => {
                        context.commit('SET_PROVINCES', result.data)
                        resolve(result.data)
                    }).catch((err) => {
                        reject(err)
                    });
            } else resolve(context.state.provinces);
        })
    },
    GET_CITIES(context, code) {
        return new Promise((resolve, reject) => {
            var action = ReferencesAPI.getCities();
            if (code) action = ReferencesAPI.getCitiesByProvince(code);
            action.then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            });
        })
    },
    GET_BARANGAY(context, code) {
        return new Promise((resolve, reject) => {
            var action = ReferencesAPI.getBarangay();
            if (code) action = ReferencesAPI.getBarangayByCity(code);
            action.then((result) => {
                resolve(result.data)
            }).catch((err) => {
                reject(err)
            });
        })
    },
    GET_CITIES_BY_CODE(context, code) {
        return new Promise((resolve, reject) => {
            ReferencesAPI.getCitiesByCode(code)
                .then((result) => {
                    resolve(result.data)
                }).catch((err) => {
                    reject(err)
                });
        })
    },
    GET_BARANGAY_BY_CODE(context, code) {
        return new Promise((resolve, reject) => {
            ReferencesAPI.getBarangayByCode(code)
                .then((result) => {
                    resolve(result.data)
                }).catch((err) => {
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



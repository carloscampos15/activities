import {
    REGISTER_REQUEST,
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "./../actions/auth";
import apiCall from "./../../utils/api";

const state = {
    access_token: localStorage.getItem("access_token") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.access_token,
    authStatus: state => state.status
};

const actions = {
    [REGISTER_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(REGISTER_REQUEST);
            apiCall({ url: "/api/register", method: "POST", data: user })
                .then(response => {
                    commit(AUTH_SUCCESS, response);
                    resolve(response);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("access_token");
                    reject(err);
                });
        });
    },
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            apiCall({ url: "/api/login", method: "POST", data: user })
                .then(response => {
                    commit(AUTH_SUCCESS, response);
                    resolve(response);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("access_token");
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("access_token");
            resolve();
        });
    }
};

const mutations = {
    [REGISTER_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, response) => {
        state.status = "success";
        localStorage.setItem("access_token", response.data.access_token);
        state.access_token = response.data.access_token;
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.access_token}`;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.access_token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
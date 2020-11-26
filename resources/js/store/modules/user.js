import { USER_REQUEST, UPDATE_PROFILE_REQUEST, UPDATE_PASSWORD_REQUEST, USER_ERROR, USER_SUCCESS } from "./../actions/user";
import apiCall from "./../../utils/api";
import { AUTH_LOGOUT } from "./../actions/auth";

const state = { status: "", user: JSON.parse(localStorage.getItem("user")) || "" };

const getters = {
    getUser: state => state.user,
    isUserLoaded: state => !!state.user.name
};

const actions = {
    [USER_REQUEST]: ({ commit, dispatch }) => {
        return new Promise((resolve, reject) => {
            commit(USER_REQUEST);
            apiCall({ url: "/api/user", method: "GET" })
                .then(response => {
                    commit(USER_SUCCESS, response.data);
                    resolve(response);
                })
                .catch((err) => {
                    console.log(err);
                    commit(USER_ERROR);
                    dispatch(AUTH_LOGOUT);
                    reject(err);
                });
        });
    },
    [UPDATE_PROFILE_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(USER_REQUEST);
            apiCall({ url: "/api/updateProfile", method: "POST", data: user })
                .then(response => {
                    commit(USER_SUCCESS, response.data);
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    [UPDATE_PASSWORD_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(USER_REQUEST);
            apiCall({ url: "/api/updatePassword", method: "POST", data: user })
                .then(response => {
                    commit(USER_SUCCESS, response.data);
                    resolve(response);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    }
};

const mutations = {
    [USER_REQUEST]: state => {
        state.status = "loading";
    },
    [USER_SUCCESS]: (state, resp) => {
        state.status = "success";
        // console.log(resp.user)
        state.user = resp.user;
    },
    [USER_ERROR]: state => {
        state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
        state.profile = {};
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
} from "./../actions/auth";
import apiCall from "./../../utils/api";

const state = {
    token: localStorage.getItem("user-token") || "",
    status: "",
    hasLoadedOnce: false
};

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
};

const actions = {
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            apiCall({ url: "/api/login", method: "POST", data: user })
                .then(response => {
                    console.log(response.data)
                    localStorage.setItem("user-token", response.token);
                    // Here set the header of your ajax library to the token value.
                    // example with axios
                    // axios.defaults.headers.common['Authorization'] = response.token
                    commit(AUTH_SUCCESS, response);
                    // aqui debo organizar el api OJO
                    // dispatch(USER_REQUEST);
                    resolve(response);
                })
                .catch(err => {
                    commit(AUTH_ERROR, err);
                    localStorage.removeItem("user-token");
                    reject(err);
                });
        });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem("user-token");
            resolve();
        });
    }
};

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, response) => {
        state.status = "success";
        state.token = response.token;
        state.hasLoadedOnce = true;
    },
    [AUTH_ERROR]: state => {
        state.status = "error";
        state.hasLoadedOnce = true;
    },
    [AUTH_LOGOUT]: state => {
        state.token = "";
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
import Vue from 'vue';
import router from './router'
import store from "./store";
import Vuetify from 'vuetify'
import axios from "axios";
import App from './views/App'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

window.axios = axios;
axios.defaults.baseURL = "http://actividades.test";
const token = localStorage.getItem('user-token')
if (token) {
    axios.defaults.headers.common['Authorization'] = token
}

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        App
    },
    router,
    store
});
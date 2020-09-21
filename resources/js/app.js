import Vue from 'vue';
import router from './router'
import store from "./store";
import Vuetify from 'vuetify'
import Vuelidate from 'vuelidate'
import axios from "axios";
import App from './components/App'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
Vue.use(Vuelidate)

window.axios = axios;
axios.defaults.baseURL = "http://actividades.test";
const access_token = localStorage.getItem('access_token')
if (access_token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`
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
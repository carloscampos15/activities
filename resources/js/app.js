import Vue from 'vue';
import router from './router'
import Vuetify from 'vuetify'
import App from './views/App'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

const app = new Vue({
    el: '#app',
    vuetify: new Vuetify(),
    components: {
        App
    },
    router
});
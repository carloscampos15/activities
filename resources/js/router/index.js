import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../components/Login';
import store from "./../store";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/home");
};

const ifAuthenticated = (to, from, next) => {
    if (store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/");
};

const routes = [
    {
        path: '/',
        name: 'Login',
        component: Login,
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import("./../components/Register"),
        beforeEnter: ifNotAuthenticated
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import("./../components/Home"),
        beforeEnter: ifAuthenticated
    },
    { path: "*", component: () => import("./../components/Alerts/404"), },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

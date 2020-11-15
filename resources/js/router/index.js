import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from './../components/Login';
import store from "./../store";
import EmptyRouterView from "./../components/Layouts/EmptyRouterView";

Vue.use(VueRouter);

const ifNotAuthenticated = (to, from, next) => {
    if (!store.getters.isAuthenticated) {
        next();
        return;
    }
    next("/schedules");
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
        path: '/schedules',
        component: EmptyRouterView,
        children: [{
            path: '',
            name: 'Schedules',
            component: () => import("./../components/Schedules"),
        },
        {
            path: 'create',
            name: 'Schedules.create',
            component: () => import("./../components/Schedules/create"),
            beforeEnter: ifAuthenticated
        }],
        beforeEnter: ifAuthenticated
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import("./../components/Profile"),
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

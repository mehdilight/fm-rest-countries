import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/:cca3',
        name: 'country-details',
        component: () => import('../pages/CountryDetails.vue'),
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router;
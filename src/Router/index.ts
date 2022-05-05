import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../Views/Home.vue'
import Register from '../Views/Register.vue'
import Check from '../Views/Check.vue'
import Print from '../Views/Print.vue'
import About from '../Views/About.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/check',
        name: 'Check',
        component: Check
    },
    {
        path: '/print',
        name: 'Print',
        component: Print
    },
    {
        path: '/about',
        name: 'About',
        component: About
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router

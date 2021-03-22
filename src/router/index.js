import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Test from '../views/Test.vue'
import Tests from '../views/Tests.vue'

import Tovar from '../views/Tovar.vue'
import Client from '../views/Client.vue'
import Edittest from '../views/Edittest.vue'
import Login from '@/views/Login'
import Register from '@/views/Register'


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/artikul',
        name: 'About',
        component: About
    },
    {
        path: '/test',
        name: 'Test',
        component: Test,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tests',
        name: 'Tests',
        component: Tests,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/tovar',
        name: 'Tovar',
        component: Tovar,
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/client',
        name: 'Client',
        component: Client, 
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            guest: true
        }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            guest: true
        }
    }, 
    {
        path: '/admin',
        name: 'admin',
        component: Edittest, 
        meta: {
            requiresAuth: true,
            requiresAdmin: true
        }
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (sessionStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(sessionStorage.getItem('user'))
            if (to.matched.some(record => record.meta.is_admin)) {
                if (user.is_admin == 1) {
                    next()
                }
                else {
                    next({ name: 'Home' })
                }
            } else {
                next()
            }
        }
    } else if (to.matched.some(record => record.meta.guest)) {
        if (sessionStorage.getItem('jwt') == null) {
            next()
        }
        else {
            next({ name: 'Home' })
        }
    } else {
        next()
    }
})

export default router

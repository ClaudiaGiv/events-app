import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import(/* webpackChunkName: "about" */ '../views/Blog.vue')
    },
    // {
    //     path: '/blog-post-1',
    //     name: 'BlogPost',
    //     component: () => import(/* webpackChunkName: "about" */ '../views/BlogPost.vue')
    // },
    {
        path: '/register',
        name: 'Register',
        component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
    },
    {
        path: '/event',
        name: 'Event',
        component: () => import(/* webpackChunkName: "about" */ '../views/Event.vue'),
        props: (route) => ({
            eventInfo: route.params.eventInfo,
            ...route.params
        })
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
    },
    {
        path: '/profile',
        name: 'Profile',
        component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
    }
]

import BlogEntries from '../data/blogs.json'

const postRoutes = BlogEntries.map(entry => {
    const posts = {
        path: `${entry.id}`,
        name: entry.id,
        component: () => import(`../content/${entry.id}.md`)
    }
    return posts
})
const blogRoutes = {
    path: '/blog-post',
    name: 'BlogPost',
    component: () => import('../views/BlogPost.vue'),
    children: postRoutes
}
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [...routes, blogRoutes]
})

export default router

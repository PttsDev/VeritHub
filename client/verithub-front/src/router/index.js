import store from '@/store'
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const isAuthenticated = (to, from, next) => {
  let logged = store.state.user.isLogged;
  if (logged) next()
  else next({name: 'home'})
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/:type([s|c])/forum/:id',
    name: 'forum',
    component: () => import('../views/ForumView.vue'),
  },
  {
    path: '/forum/:type([s|c])/:idForum/:idThread',
    name: 'thread',
    component: () => import('../views/ThreadView.vue'),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

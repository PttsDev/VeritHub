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
    path: '/results',
    name: 'results',
    //Añadir ResultsView
    component: () => import(/* webpackChunkName: "about" */ '../views/ResultsView.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfileView.vue'),
    beforeEnter: isAuthenticated
  },
  {
    path: '/institution/:id',
    name: 'institution',
    component: () => import('../views/InstitutionsView.vue'),
  },
  {
    path: '/course/:id',
    name: 'course',
    component: () => import('../views/CoursesView.vue'),
  },
  {
    path: '/subject/:id',
    name: 'subject',
    component: () => import('../views/SubjectView.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

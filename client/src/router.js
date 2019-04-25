import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Dashboard from './views/Dashboard.vue'
import ApodDetail from './views/ApodDetail.vue'
import NotFound from './views/NotFound.vue'
import Update from './views/Update.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      children: [
        {
          path: ':ApodId',
          name: 'ApodDetail',
          component: ApodDetail
        }
      ]
    },
    {
      path: '/update/:ApodId',
      name: 'update',
      component: Update
    },
    {
      path: '/404',
      name: 'notfound404',
      component: NotFound
    },
    {
      path: '*',
      name: 'notfound',
      component: NotFound
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

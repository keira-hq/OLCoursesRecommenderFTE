import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('@/views/loginPage')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/loginPage')
    },
    {
      path: '/play/:id',
      name: 'Play',
      component: () => import('@/views/player')
    }
  ]
})

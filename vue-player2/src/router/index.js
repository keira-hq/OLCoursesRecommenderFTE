import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: '',
      component: () => import('@/views/login')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    },
    {
      path: '/play/:id/:name',
      name: 'Play',
      component: () => import('@/views/player')
    }
  ]
})


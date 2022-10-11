import Vue from 'vue'
import VueRouter from 'vue-router'
import LayoutView from '../views/LayoutView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'layout',
    component: LayoutView,
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/HomeView.vue')
      },
      {
        path: '/classify',
        name: 'classify',
        component: () => import('../views/ClassifyView.vue')
      },
      {
        path: '/about',
        name: 'about',
        component: () => import('../views/AboutView.vue'),
        children: [
          {
            path: '/browHistory',
            name: 'browHistory',
            component: () => import('../views/BrowHistoryView.vue')
          },
          {
            path: '/myCollection',
            name: 'myCollection',
            component: () => import('../views/MyCollectionView.vue')
          }

        ]
      }
    ]
  },

  {
    path: '/list',
    name: 'list',
    component: () => import('../views/ListView.vue')
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import('../views/DetailView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

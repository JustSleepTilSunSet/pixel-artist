import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import DrawerView from '../views/DrawerView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/draw',
    name: 'draw',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: DrawerView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

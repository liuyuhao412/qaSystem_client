import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/LoginVue.vue")
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/login/RegisterVue.vue")
  },
  {
    path: '/index',
    name: 'index',
    component: () => import("@/views/user/UserIndexVue.vue")
  },
  {
    path: '/admin_index',
    name: 'admin_index',
    component: () => import("@/views/admin/AdminIndexVue.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

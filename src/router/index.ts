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
    component: () => import("@/views/admin/AdminIndexVue.vue"),
    children: [
      {
        path: '/admin_index',
        redirect: '/admin_home'
      },
      {
        path: "/admin_home",
        name: "admin_home",
        component: () => import("@/views/admin/home/HomeVue.vue"),
      },
      {
        path: "/admin_user",
        name: "admin_user",
        component: () => import("@/views/admin/user/UserVue.vue"),
      },
      {
        path: "/admin_log",
        name: "admin_log",
        component: () => import("@/views/admin/log/LogVue.vue"),
      },
      {
        path: "/admin_code",
        name: "admin_code",
        component: () => import("@/views/admin/code/CodeVue.vue"),
      },
      {
        path: "/admin_model",
        name: "admin_model",
        component: () => import("@/views/admin/model/ModelVue.vue"),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/login/LoginVue.vue"),
    meta: { requiresAuth: false }, // 注册页面不需要身份验证
  },
  {
    path: '/register',
    name: 'register',
    component: () => import("@/views/login/RegisterVue.vue"),
    meta: { requiresAuth: false }, // 登录页面不需要身份验证
  },
  {
    path: '/index',
    name: 'index',
    component: () => import("@/views/user/UserIndexVue.vue"),
    meta: { requiresAuth: true },
    children: [
      {
        path: '/index',
        redirect: '/user_home'
      },
      {
        path: "/user_home",
        name: "user_home",
        component: () => import("@/views/user/home/HomeVue.vue"),
      },
      {
        path: "/user_view",
        name: "user_view",
        component: () => import("@/views/user/qaview/IndexVue.vue"),
      }, 
      {
        path: "/user_history",
        name: "user_history",
        component: () => import("@/views/user/history/HistoryIndexVue.vue"),
      },
    ]
  },
  {
    path: '/admin_index',
    name: 'admin_index',
    component: () => import("@/views/admin/AdminIndexVue.vue"),
    meta: { requiresAuth: true },
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
        path: "/admin_model_config",
        name: "admin_model_config",
        component: () => import("@/views/admin/model/ModelConfigVue.vue"),
      },
      {
        path: "/admin_kb_list",
        name: "admin_kb_list",
        component: () => import("@/views/admin/model/KbListVue.vue"),
      },
      {
        path: "/admin_file_list",
        name: "admin_file_list",
        component: () => import("@/views/admin/model/FileListVue.vue"),
      },
      {
        path: "/admin_history",
        name: "admin_history",
        component: () => import("@/views/admin/history/HistoryVue.vue"),
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem('token');

  // 如果路由需要登录验证，并且用户未登录，则跳转到登录页面
  if (to.meta.requiresAuth && !token && to.path !== '/login') {
    next('/login')
  } else {
    next();
  }
});

export default router

import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView";
import {getSessionStorage} from "@/Common";

// meta.auth表示是否进行路由拦截
const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/RegisterView.vue'),
    meta: {
      auth: false,
    },
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/change',
    name: 'change',
    component: () => import('../views/ChangeView.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/all',
    name: 'all',
    component: () => import('../views/AllView.vue'),
    meta: {
      auth: true,
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由拦截：当sessionStorage中usr为空且页面meta属性中auth为true时需要先进行登录
router.beforeEach((to,from, next) => {
  if (to.meta.auth) {
    if (getSessionStorage('usr')) {
      next()
    } else {
      next({
        path: '/',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next();
  }
});

export default router

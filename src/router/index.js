import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "@/views/LoginView";
import {getSessionStorage} from "@/Common";

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
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

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

import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import { useAuthStore } from '@/store'

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.getUser?.token) {
    next({name: 'Login'})
  } else if (authStore.getUser?.token && to.meta.isGuest) {
    next({name: 'Dashboard'})
  } else {
    next()
  }
})

export default router

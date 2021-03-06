import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import NotFound from '@/views/NotFound.vue'
import UnAuthorized from '@/views/UnAuthorized.vue'

export default [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    meta: { isGuest: true, layout: 'auth' },
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    meta: { isGuest: true, layout: 'auth' },
    component: () => import('@/views/Register.vue'),
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue'),
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    meta: { requiresAuth: true },
    component: () => import('@/views/Dashboard.vue'),
  },
  {
    path: '/channels/:id/videos',
    name: 'VideosShow',
    meta: { requiresAuth: true },
    component: () => import('@/views/channels/VideosShow.vue'),
  },
  {
    path: '/channels/:id',
    name: 'ChannelsShow',
    component: () => import('@/views/channels/Show.vue'),
  },
  {
    path: '/videos/:id',
    name: 'ViewVideo',
    component: () => import('@/views/channels/ViewVideo.vue'),
  },
  {
    path: "/unauthorized",
    name: "Unauthorized",
    meta: { layout: 'empty' },
    component: UnAuthorized,
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    meta: { layout: 'empty' },
    component: NotFound,
  }
]

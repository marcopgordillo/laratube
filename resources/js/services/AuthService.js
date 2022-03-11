import axios from "axios"
import { useAuthStore } from '@/store'
import API from './API'

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Handle CSRF Token
})

authClient.interceptors.response.use(
  response => response,
  err => {
    const authStore = useAuthStore()
    if (err.response
      && [401, 419].includes(err.response.status)
      && authStore.user.token
      ) {
        authStore.logout()
      }
    return Promise.reject(err)
  }
)

export default {
  async logout() {
    return API.post('/logout')
  },
  async registerUser(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/register', payload)
  },
  async login(payload) {
    await authClient.get('/sanctum/csrf-cookie')
    return authClient.post('/login', payload)
  },
}

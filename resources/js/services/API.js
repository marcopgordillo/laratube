import axios from 'axios'
import { useAuthStore } from '@/store'

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Handle CSRF Token
})

axiosClient.interceptors.request.use(config => {
  const authStore = useAuthStore()
  if (authStore.user.token) {
    config.headers.Authorization = `Bearer ${authStore.user.token}`
  }
  return config
})


axiosClient.interceptors.response.use(
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

export default axiosClient

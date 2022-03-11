import { defineStore } from 'pinia'
import { AuthService } from '@/services'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      data: {},
      token: sessionStorage.getItem('TOKEN'),
    },
    error: null,
  }),
  getters: {
    getUser: state => state.user.data,
  },
  actions: {
    async logout() {
      const { data } = await AuthService.logout()
      this.user.data = {}
      this.user.token = null
      sessionStorage.removeItem('TOKEN')
    },
    async registerUser(payload) {
      const { data } = await AuthService.registerUser(payload)
      this.user.data = data.data.user
      this.user.token = data.data.token
      sessionStorage.setItem('TOKEN', data.data.token)
    },
    async login(payload) {
      const { data } = await AuthService.login(payload)
      this.user.data = data.data.user
      this.user.token = data.data.token
      sessionStorage.setItem('TOKEN', data.data.token)

    }
  }
})

export default useAuthStore

import { defineStore } from 'pinia'
import { AuthService } from '@/services'

const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(sessionStorage.getItem('USER')),
  }),
  getters: {
    getUser: state => state.user,
    getChannel: state => state.user.channel,
  },
  actions: {
    logout() {
      AuthService.logout()
      this.user = {}
      sessionStorage.removeItem('USER')
    },
    async registerUser(payload) {
      const { data } = await AuthService.registerUser(payload)
      this.user = data.data
      sessionStorage.setItem('USER', JSON.stringify(data.data))
    },
    async login(payload) {
      const { data } = await AuthService.login(payload)
      this.user = data.data
      sessionStorage.setItem('USER', JSON.stringify(data.data))

    }
  }
})

export default useAuthStore

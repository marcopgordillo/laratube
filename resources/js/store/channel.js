import { defineStore } from 'pinia'
import { API } from '@/services'

const useChannelStore = defineStore('channel', {
  state: () => ({
    channel: {
      name: null,
      description: null,
      image: null
    },
    notification: {
      show: false,
      type: null,
      message: null,
    },
    loading: false,
  }),
  getters: {
    getChannel: state => state.channel,
    getNotification: state => state.notification,
    getLoading: state => state.loading,
  },
  actions: {
    async fetchChannel(payload) {
      this.loading = true
      try {
        const { data } = await API.get(`/channels/${payload}`)
        this.loading = false
        this.channel = data.data
      } catch (err) {
        this.loading = false
        throw err
      }
    },
    async saveChannel(payload) {
      this.loading = true
      try {
        const { data } = await API.put(`/channels/${this.channel.id}`, payload)
        this.loading = false
        this.channel = data.data
      } catch (err) {
        this.loading = false
        throw err
      }
    },
    notify({ message, type }) {
      this.notification.show = true
      this.notification.type = type
      this.notification.message = message
      setTimeout(() => this.notification.show = false, 3000)
    },
  }
})

export default useChannelStore

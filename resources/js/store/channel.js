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
  }),
  getters: {
    getChannel: state => state.channel,
    getNotification: state => state.notification,
  },
  actions: {
    async fetchChannel(payload) {
      const { data } = await API.get(`/channels/${payload}`)
      this.channel = data.data
    },
    async saveChannel(payload) {
      const { data } = await API.put(`/channels/${this.channel.id}`, payload)
      this.channel = data.data
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

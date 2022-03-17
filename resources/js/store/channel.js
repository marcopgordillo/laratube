import { defineStore } from 'pinia'
import numeral from 'numeral'
import { API } from '@/services'

const useChannelStore = defineStore('channel', {
  state: () => ({
    channel: {},
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
    getSubscriptions: state => state.channel.subscriptions
                                ? numeral(state.channel.subscriptions).format('0a')
                                : null,
  },
  actions: {
    async fetchChannel({id, loggedId}) {
      this.loading = true
      try {
        const { data } = await API.get(`/channels/${id}?logged_id=${loggedId}`)
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
        const { data } = await API.post(`/channels/${this.channel.id}`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.loading = false
        this.channel = data.data
      } catch (err) {
        this.loading = false
        throw err
      }
    },
    async uploadVideo(payload) {
      this.loading = true
      try {
        await API.post(`/channels/${this.channel.id}/video`, payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        })
        this.loading = false
      } catch (err) {
        this.loading = false
        throw err
      }
    },
    async toggleSubscribe(user_id) {
      this.loading = true
      try {
        const { data } = await API.patch(`/channels/${this.channel.id}/subscriptions`)
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

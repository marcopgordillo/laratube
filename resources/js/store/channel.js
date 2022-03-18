import { defineStore } from 'pinia'
import numeral from 'numeral'
import { API } from '@/services'
import {nextTick} from "vue";

const useChannelStore = defineStore('channel', {
  state: () => ({
    channel: {},
    notification: {
      show: false,
      type: null,
      message: null,
    },
    loading: false,
    uploads: [],
    progress: {},
    intervals: {},
    currentVideo: {},
  }),
  getters: {
    getChannel: state => state.channel,
    getNotification: state => state.notification,
    getLoading: state => state.loading,
    getSubscriptions: state => state.channel.subscriptions
                                ? numeral(state.channel.subscriptions).format('0a')
                                : null,
    getCurrentVideo: state => state.currentVideo,
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
        this.channel = data.data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    async uploadVideos(payload) {
      payload.map(async (video) => {
        this.uploads = [
          ...this.uploads,
          {
            title: video.name,
          }
        ]
        this.progress[video.name] = 0
        const form = new FormData()
        form.append('video', video)
        form.append('title', video.name)

        try {
          const { data } = await API.post(`/channels/${this.channel.id}/videos`, form, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
            onUploadProgress: (event) => {
              this.progress[video.name] = Math.ceil((event.loaded / event.total) * 100)
            }
          })

          this.uploads = this.uploads.map(v => v.title === data.data.title ? data.data : v)

          this.intervals[data.data.id] = setInterval(async () => {
            const { data: { data: video } } = await API.get(`videos/${data.data.id}`)
            if (video.percentage === 100) {
              clearInterval(this.intervals[video.id])
            }
            this.uploads = this.uploads.map(v => v.id === video.id ? video : v)
          }, 3000)
        } catch (err) {
          throw err
        }
      })
    },
    async toggleSubscribe() {
      this.loading = true
      try {
        const { data } = await API.patch(`/channels/${this.channel.id}/subscriptions`)
        this.channel = data.data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    async getVideo(id) {
      try {
        this.loading = true
        const { data } = await API.get(`/videos/${id}`)
        this.currentVideo = data.data
      } catch (err) {
        throw err
      } finally {
        this.loading = false
      }
    },
    notify({ message, type }) {
      this.notification.show = true
      this.notification.type = type
      this.notification.message = message
      setTimeout(() => this.notification.show = false, 3000)
    },
    deleteProgress(key) {
      delete this.progress[key]
    },
  }
})

export default useChannelStore

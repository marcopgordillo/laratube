import { defineStore } from 'pinia'

const useMainStore = defineStore('main', {
  state: () => ({
    dashboard: {
      data: {},
      loading: false,
    }
  }),
  getters: {
  },
  actions: {
  }
})

export default useMainStore

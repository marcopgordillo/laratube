import { defineStore } from 'pinia'
import { API } from '@/services'

const useSurveyStore = defineStore('survey', {
  state: () => ({
    surveys: {
      loading: false,
      links: [],
      data: [],
    },
    currentSurvey: {
      loading: false,
      data: null,
    },
    questionTypes: ['text', 'select', 'radio', 'checkbox', 'textarea'],
    notification: {
      show: false,
      message: null,
      type: null,
    },
  }),
  getters: {},
  actions: {
    async saveSurvey(survey) {
      this.currentSurvey.loading = true
      delete survey.image_url
      try {
        if (survey.id) { // update
          const { data } = await API.put(`/surveys/${survey.id}`, survey)
          this.currentSurvey.data = data.data
          this.surveys.data = this.surveys.data.map(
            (s) => s.id === data.data.id ? data.data : s
          )
          this.currentSurvey.loading = false
          return data
        } else { // create
          const { data } = await API.post('/surveys', survey)
          this.currentSurvey.data = data.data
          this.surveys.data = [...this.surveys.data, data.data]
          this.currentSurvey.loading = false
          return data
        }
      } catch (err) {
        this.currentSurvey.loading = false
        throw err
      }
    },
    async getSurvey(id) {
      this.currentSurvey.loading = true
      try {
        const { data } = await API.get(`/surveys/${id}`)
        this.currentSurvey.data = data.data

        this.currentSurvey.loading = false
        return data
      } catch (err) {
        this.currentSurvey.loading = false
        throw err
      }
    },
    async deleteSurvey(survey) {
      try {
        const response = await API.delete(`/surveys/${survey.id}`)
        if (response.status !== 204)
          throw new Error("Survey can't be removed.")

        this.surveys.data = this.surveys.data.filter(s => s.id !== survey.id)
        this.currentSurvey.data = {}
        return true
      } catch (err) {
        throw err
      }
    },
    async getSurveys({ url = null } = {}) {
      url = url || '/surveys'
      this.surveys.loading = true
      try {
        const { data } = await API.get(url)
        this.surveys.data = data.data
        this.surveys.links = data.meta.links
        this.surveys.loading = false
      } catch (err) {
        this.surveys.loading = false
        throw err
      }
    },
    notify({ message, type }) {
      this.notification.show = true
      this.notification.type = type
      this.notification.message = message
      setTimeout(() => this.notification.show = false, 3000)
    },
    async getSurveyBySlug(slug) {
      this.currentSurvey.loading = true
      try {
        const { data } = await API.get(`/survey-by-slug/${slug}`)
        this.currentSurvey.data = data.data
        this.currentSurvey.loading = false
        return data
      } catch (err) {
        this.currentSurvey.loading = false
        throw err
      }
    },
    async saveSurveyAnswers({surveyId, answers}) {
      this.currentSurvey.loading = true
      try {
        await API.post(`/surveys/${surveyId}/answers`, { answers })
        this.currentSurvey.loading = false
      } catch (err) {
        this.currentSurvey.loading = false
        throw err
      }
    },
  }
})

export default useSurveyStore

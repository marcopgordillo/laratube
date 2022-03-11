import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import DefaultLayout from '@/components/layouts/DefaultLayout.vue'
import EmptyLayout from '@/components/layouts/EmptyLayout.vue'
import AuthLayout from '@/components/layouts/AuthLayout.vue'
import { LoadingComponent } from '@/components/base'

import '../css/app.css'

const app = createApp(App)
          .use(createPinia())
          .use(router)

app.component('default-layout', DefaultLayout)
app.component('auth-layout', AuthLayout)
app.component('empty-layout', EmptyLayout)
app.component('loading-component', LoadingComponent)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jQuery from 'jquery'
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import VPagination from '@hennge/vue3-pagination'
import '@hennge/vue3-pagination/dist/vue3-pagination.css'
import { config } from './utils/config'

const app = createApp(App)

app.component('Datepicker', Datepicker)
app.component('VPagination', VPagination)
app.provide('company', config.company)

global.$ = jQuery

app
  .use(store)
  .use(router)
  .mount('#app')

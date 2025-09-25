import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import router from './router'
import App from './App.vue'
import Aura from '@primeuix/themes/aura'
import '@flaticon/flaticon-uicons/css/all/all.css'
import Tooltip from 'primevue/tooltip'

const app = createApp(App)
  .use(router)
  .use(PrimeVue, {
    theme: {
      preset: Aura,
    },
  })
  .directive('tooltip', Tooltip)

app.use(createPinia())

app.mount('#app')

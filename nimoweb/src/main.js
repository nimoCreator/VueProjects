import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from '@/App.vue'
import router from '@/assets/js/router'
import i18n from '@/assets/js/i18n'

import '@/assets/css/vars.css'
import '@/assets/css/base.css'
import '@/assets/css/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

app.mount('#app')
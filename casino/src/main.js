import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/styles.css'
import { createLocalStoragePlugin } from './stores/persist.js'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createLocalStoragePlugin({ keyPrefix: 'red-royale:' }))
app.use(pinia)
app.use(router)

app.mount('#app')

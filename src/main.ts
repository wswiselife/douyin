import { createApp } from 'vue'
import './style.css'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { createPinia } from 'pinia'

import router from './router/router'


const pinia = createPinia()

createApp(App)
    .use(router)
    .use(pinia)
    .use(ElementPlus)
    .mount('#app')

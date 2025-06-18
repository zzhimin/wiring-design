import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import componentsPlugin from './plugins/componentsPlugin';
createApp(App)
.use(componentsPlugin)
.mount('#app')

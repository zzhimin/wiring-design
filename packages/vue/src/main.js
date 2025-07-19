import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import componentsPlugin from './plugins/componentsPlugin';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
createApp(App)
.use(componentsPlugin)
.use(Antd)
.mount('#app')

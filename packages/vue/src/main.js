import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:uno.css'
import componentsPlugin from './plugins/componentsPlugin';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css';
import fullscreen from './directives/fullscreen';
import copy from './directives/copy';

const app = createApp(App)

app.directive('fullscreen', fullscreen);
app.directive('copy', copy);

app.use(componentsPlugin)
app.use(Antd)
app.mount('#app')

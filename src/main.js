import {createApp} from 'vue'
import App from './App.vue'
import 'vite-plugin-vuedoc/style.css'
import router from './router/index'

import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import climbUi from 'climb-ui'

createApp(App).use(ElementPlus).use(climbUi).use(router).mount('#app')

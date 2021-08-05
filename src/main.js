import {createApp} from 'vue'
import App from './App.vue'
import 'vite-plugin-vuedoc/style.css'
import router from './router/index'
import axios from "./utils/axios"

import ElementPlus from 'element-plus'
import local from "element-plus/lib/locale/lang/zh-cn"
import 'element-plus/lib/theme-chalk/index.css'

// import climbUi from 'climb-ui'
import climbUi from '/packages/src'

window.axios = axios;
createApp(App).use(ElementPlus, {local}).use(climbUi).use(router).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './store'

// 全局样式（Tailwind CSS + 自定义主题）
import './assets/css/index.css'

// 创建 Vue 应用实例
const app = createApp(App)

// 注册插件
app.use(pinia)
app.use(router)

// 挂载应用
app.mount('#app')

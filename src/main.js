// 该文件是全局配置文件
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import getVant from './plugins/index'
const app=createApp(App)
getVant(app)
app.use(store)
app.use(router).mount('#app')

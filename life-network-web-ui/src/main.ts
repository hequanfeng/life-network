import { createApp } from 'vue'
import router from './router'
import { store } from './store'
import 'virtual:svg-icons-register'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import './styles/index.scss'
import App from './App.vue'
import i18n from './i18n'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'font-awesome/css/font-awesome.min.css'
import permission from './directive/permission'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
permission(app)
app.use(store).use(router).use(i18n).use(ElementPlus).mount('#app')

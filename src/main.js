import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from './router/index.js'
import logincss from './css/login.css'
import Carousel from "v3-carousel"; 
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import Axios from './utils/request.js'
import qs from 'qs'
const app=createApp(App)
const pinia=createPinia();
app.use(ElementPlus)
app.use(qs)
app.use(Carousel)
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(logincss)
app.use(Search)
app.use(router)
for(const[key,component] of Object.entries(ElementPlusIconsVue)){
    app.component(key,component)
}
app.mount('#app')
app.config.warnHandler = () => null;
app.config.globalProperties.$axios=Axios;



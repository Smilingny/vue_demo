import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import qs from 'qs'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import {
    getSessionStorage,
    setSessionStorage,
    removeSessionStorage,
    getCurDate
} from './Common'

axios.defaults.baseURL='http://localhost:8080/service/'

const app = createApp(App);
app.use(router);
app.use(ElementPlus);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$qs = qs;
app.config.globalProperties.$getSessionStorage = getSessionStorage;
app.config.globalProperties.$setSessionStorage = setSessionStorage;
app.config.globalProperties.$removeSessionStorage = removeSessionStorage;
app.config.globalProperties.$getCurDate = getCurDate;
app.mount('#app');

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


Vue.prototype.$server =  'http://127.0.0.1:3000';
createApp(App).use(store).use(router).mount('#app')

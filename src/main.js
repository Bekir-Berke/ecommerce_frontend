import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { plugin, defaultConfig } from '@formkit/vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '@/global.css';

createApp(App).use(store).use(router).use(plugin, defaultConfig).mount('#app')

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueToast from 'vue-toast-notification';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { plugin, defaultConfig } from '@formkit/vue'
import 'vue-toast-notification/dist/theme-sugar.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';
import '@/global.css';

createApp(App).use(store).use(router).use(VueToast, {position:'bottom-right', duration:1500}).use(VueSweetalert2).use(plugin, defaultConfig).mount('#app')

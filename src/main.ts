import 'mutationobserver-shim'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/Router'

createApp(App).use(router).mount('#app')

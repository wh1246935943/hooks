import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App'
import router from './router'

import vClickOutside from "./directive/vClickOutsid/index";

import './main.less'

const app = createApp(App)

app.directive('click-outside', vClickOutside)

app.use(createPinia())
app.use(router)

app.mount('#app')

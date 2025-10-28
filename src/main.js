import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './styles/global.css' // Import global styles

// ✅ Import Vue Toastification
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

// ✅ Create app instance
const app = createApp(App)

// ✅ Use router and toast plugin
app.use(router)
app.use(Toast)

// ✅ Mount the app
app.mount('#app')

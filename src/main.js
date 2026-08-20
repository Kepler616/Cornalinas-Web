import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { reveal } from './directives/reveal'
import { i18n, cambiarIdioma } from './i18n.js'

const app = createApp(App)
app.directive('reveal', reveal)
app.use(i18n)
app.mount('#app')

// Aplica el idioma detectado/guardado al <html lang> y a los metadatos
// desde el arranque, no solo cuando el usuario cambia de idioma.
cambiarIdioma(i18n.global.locale.value)

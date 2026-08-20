import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  // Rutas relativas: el sitio se sirve desde un subdirectorio en GitHub
  // Pages (kepler616.github.io/Cornalinas-Web/), no desde la raíz del
  // dominio, así que las rutas absolutas ("/assets/...") apuntarían al
  // lugar equivocado.
  base: './',
})

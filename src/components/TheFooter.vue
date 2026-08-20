<script setup>
import { useI18n } from 'vue-i18n'
import monograma from '../assets/brand/monograma-crema.png'

const { t } = useI18n()
const anio = 2026
const paleta = ['#9f1e21', '#fcd5bf', '#7c1219', '#c8252d', '#dd3646', '#b9853f']
</script>

<template>
  <footer class="pie">
    <span class="orbe orbe--rojo orbe--vagar2 pie__orbe1" style="animation-delay: -25s" aria-hidden="true"></span>
    <span class="orbe orbe--oro orbe--vagar4 pie__orbe2" style="animation-delay: -3s" aria-hidden="true"></span>

    <div class="contenedor pie__tributo cristal cristal--oscuro" v-reveal="{ tipo: 'escala' }">
      <img :src="monograma" alt="Cornalinas" class="pie__monograma" />
      <p class="eyebrow eyebrow--claro">{{ t('footer.eyebrow') }}</p>
      <h2>{{ t('footer.titulo') }}</h2>
      <p class="pie__cuerpo">{{ t('footer.cuerpo') }}</p>
      <p class="pie__cierre">{{ t('footer.cierre') }}</p>
    </div>

    <div class="contenedor pie__linea">
      <nav class="pie__enlaces">
        <a href="#historia">{{ t('nav.historia') }}</a>
        <a href="#coleccion">{{ t('nav.coleccion') }}</a>
        <a href="#pedido">{{ t('nav.pedido') }}</a>
      </nav>

      <ul class="pie__paleta cristal cristal--oscuro" aria-hidden="true">
        <li v-for="color in paleta" :key="color" :style="{ background: color }"></li>
      </ul>
    </div>

    <div class="contenedor pie__base">
      <p>hola@cornalinas.com</p>
      <p>{{ t('footer.copyright', { anio }) }}</p>
    </div>
  </footer>
</template>

<style scoped>
.pie {
  position: relative;
  overflow: hidden;
  background: var(--negro);
  color: var(--crema-suave);
  padding-block: var(--espacio-seccion) 2.4rem;
}

.pie__orbe1 {
  width: 420px;
  height: 420px;
  top: -12%;
  left: -8%;
}

.pie__orbe2 {
  width: 340px;
  height: 340px;
  bottom: -14%;
  right: -6%;
  animation-delay: -6s;
}

.pie__tributo {
  position: relative;
  z-index: 1;
  max-width: 44rem;
  text-align: center;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(2rem, 5vw, 3.4rem) clamp(1.6rem, 4vw, 3rem);
}

.pie__monograma {
  width: 44px;
  margin-bottom: 1.6rem;
  opacity: 0.85;
}

.pie__tributo h2 {
  margin-top: 1rem;
  color: var(--blanco);
  font-size: clamp(2rem, 4.6vw, 3rem);
}

.pie__cuerpo {
  margin-top: 1.4rem;
  opacity: 0.82;
  font-size: 1.05rem;
}

.pie__cierre {
  margin-top: 2rem;
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--oro-brillo);
}

.pie__linea {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: clamp(3rem, 7vw, 5rem);
  padding-top: 2rem;
  border-top: 1px solid rgba(252, 213, 191, 0.12);
}

.pie__enlaces {
  display: flex;
  gap: 2rem;
}

.pie__enlaces a {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--crema-suave);
  opacity: 0.75;
}

.pie__enlaces a:hover {
  opacity: 1;
}

.pie__paleta {
  display: flex;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0.6rem 0.9rem;
  border-radius: 999px;
}

.pie__paleta li {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.pie__base {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(252, 213, 191, 0.1);
  font-size: 0.76rem;
  color: var(--crema-suave);
  opacity: 0.55;
}

@media (max-width: 640px) {
  .pie__linea {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

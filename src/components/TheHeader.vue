<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import logoCrema from '../assets/brand/logotipo-crema.png'
import logoRojo from '../assets/brand/logotipo-rojo.png'
import { useCarrito } from '../composables/useCarrito'
import SelectorIdioma from './SelectorIdioma.vue'

const { t } = useI18n()
const { totalArticulos } = useCarrito()

const scrolled = ref(false)
const abierto = ref(false)

const enlaces = computed(() => [
  { texto: t('nav.historia'), destino: '#historia' },
  { texto: t('nav.coleccion'), destino: '#coleccion' },
])

function alScroll() {
  scrolled.value = window.scrollY > 40
}

function cerrarMenu() {
  abierto.value = false
}

onMounted(() => window.addEventListener('scroll', alScroll))
onUnmounted(() => window.removeEventListener('scroll', alScroll))
</script>

<template>
  <header class="nav" :class="{ 'nav--solida': scrolled }">
    <div class="nav__interior contenedor">
      <a href="#inicio" class="nav__marca" @click="cerrarMenu">
        <img :src="scrolled ? logoRojo : logoCrema" alt="Cornalinas" />
      </a>

      <nav class="nav__enlaces">
        <a v-for="enlace in enlaces" :key="enlace.destino" :href="enlace.destino">
          {{ enlace.texto }}
        </a>
        <a href="#pedido" class="nav__pedido">
          {{ t('nav.pedido') }}
          <span class="nav__contador" :class="{ activo: totalArticulos > 0 }">{{ totalArticulos }}</span>
        </a>
        <SelectorIdioma :oscuro="scrolled" />
      </nav>

      <button class="nav__hamburguesa" :class="{ activa: abierto, oscura: scrolled }" @click="abierto = !abierto" :aria-label="t('nav.abrirMenu')">
        <span></span><span></span><span></span>
      </button>
    </div>

    <transition name="menu">
      <nav v-if="abierto" class="nav__movil">
        <a v-for="enlace in enlaces" :key="enlace.destino" :href="enlace.destino" @click="cerrarMenu">
          {{ enlace.texto }}
        </a>
        <a href="#pedido" @click="cerrarMenu">{{ t('nav.pedido') }} ({{ totalArticulos }})</a>
      </nav>
    </transition>
  </header>

  <!-- En móvil el selector vive como botón flotante (ver SelectorIdioma), no
       dentro del menú hamburguesa, para que quede accesible sin abrir el
       menú. Se declara fuera de <header> a propósito: ese elemento usa
       backdrop-filter, que crea un containing block nuevo y rompe
       position:fixed en los descendientes. -->
  <SelectorIdioma flotante />
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  padding-block: 1.5rem;
  background: linear-gradient(180deg, rgba(20, 5, 5, 0.28), rgba(20, 5, 5, 0));
  backdrop-filter: blur(6px) saturate(120%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  transition: background 0.5s ease, padding 0.5s ease, box-shadow 0.5s ease, border-color 0.5s ease, backdrop-filter 0.5s ease;
}

.nav--solida {
  background: var(--cristal-claro-fondo);
  backdrop-filter: blur(13px) saturate(160%);
  border-bottom: 1px solid var(--cristal-claro-borde);
  padding-block: 0.9rem;
  box-shadow: 0 12px 32px -20px rgba(58, 31, 20, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.5);
}

/* Sin desenfoque, un fondo al 50% deja el contenido de abajo asomándose y
   se ve sucio (el contenido se lee "por encima" del texto del menú). Si el
   navegador no soporta backdrop-filter, o el usuario pidió menos
   transparencia, se sube la opacidad para que la barra se lea sólida. */
@media (prefers-reduced-transparency: reduce) {
  .nav--solida { background: var(--cristal-claro-fondo-solido); }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .nav--solida { background: var(--cristal-claro-fondo-solido); }
}

.nav__interior {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__marca img {
  height: 38px;
  width: auto;
}

.nav__enlaces {
  display: flex;
  align-items: center;
  gap: 2.6rem;
}

.nav--solida .nav__enlaces a {
  color: var(--cacao);
}

.nav__enlaces a {
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--crema-suave);
  opacity: 0.9;
  position: relative;
  padding-bottom: 4px;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.nav__enlaces a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 1px;
  background: currentColor;
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav__enlaces a:hover::after {
  right: 0;
}

.nav__pedido {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.nav__contador {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 20px;
  height: 20px;
  padding: 0 4px;
  line-height: 1;
  border-radius: 999px;
  background: rgba(20, 5, 5, 0.28);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 244, 224, 0.3);
  color: inherit;
  font-size: 0.68rem;
  font-variant-numeric: tabular-nums;
  transition: background 0.3s ease, color 0.3s ease, transform 0.3s ease;
}

.nav__contador.activo {
  background: var(--rojo);
  color: var(--blanco);
  transform: scale(1.08);
}

.nav__hamburguesa {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 34px;
  height: 34px;
  background: none;
  border: none;
  padding: 0;
}

.nav__hamburguesa span {
  height: 1px;
  background: var(--crema-suave);
  transition: transform 0.3s ease, opacity 0.3s ease, background 0.3s ease;
}

.nav__hamburguesa.oscura span {
  background: var(--cacao);
}

.nav__hamburguesa.activa span:nth-child(1) {
  transform: translateY(6px) rotate(45deg);
}
.nav__hamburguesa.activa span:nth-child(2) {
  opacity: 0;
}
.nav__hamburguesa.activa span:nth-child(3) {
  transform: translateY(-6px) rotate(-45deg);
}

.nav__movil {
  display: none;
}

@media (max-width: 860px) {
  .nav__enlaces {
    display: none;
  }
  .nav__hamburguesa {
    display: flex;
  }
  .nav__movil {
    display: flex;
    flex-direction: column;
    gap: 1.4rem;
    padding: 1.6rem clamp(1.5rem, 5vw, 4rem) 2.2rem;
    background: var(--cristal-oscuro-fondo);
    backdrop-filter: blur(24px) saturate(160%);
    border-bottom: 1px solid var(--cristal-oscuro-borde);
  }
  .nav__movil a {
    font-family: var(--fuente-display);
    font-size: 1.3rem;
    color: var(--crema-suave);
  }
}

/* Mismo respaldo que .nav--solida: sin desenfoque, el 55% de opacidad deja
   el contenido de la página asomándose detrás de los enlaces del menú. */
@media (prefers-reduced-transparency: reduce) {
  .nav__movil { background: var(--cristal-oscuro-fondo-solido); }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .nav__movil { background: var(--cristal-oscuro-fondo-solido); }
}

.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.3s ease;
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
}
</style>

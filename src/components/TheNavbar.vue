<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logoCrema from '../assets/brand/logotipo-crema.png'

const scrolled = ref(false)
const abierto = ref(false)

const enlaces = [
  { texto: 'Colección', destino: '#coleccion' },
  { texto: 'El Oficio', destino: '#oficio' },
  { texto: 'Formatos', destino: '#formatos' },
  { texto: 'Contacto', destino: '#contacto' },
]

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
        <img :src="logoCrema" alt="Cornalinas" />
      </a>

      <nav class="nav__enlaces">
        <a v-for="enlace in enlaces" :key="enlace.destino" :href="enlace.destino">
          {{ enlace.texto }}
        </a>
      </nav>

      <button class="nav__hamburguesa" :class="{ activa: abierto }" @click="abierto = !abierto" aria-label="Abrir menú">
        <span></span><span></span><span></span>
      </button>
    </div>

    <transition name="menu">
      <nav v-if="abierto" class="nav__movil">
        <a v-for="enlace in enlaces" :key="enlace.destino" :href="enlace.destino" @click="cerrarMenu">
          {{ enlace.texto }}
        </a>
      </nav>
    </transition>
  </header>
</template>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 100;
  padding-block: 1.4rem;
  transition: background 0.5s ease, padding 0.5s ease, box-shadow 0.5s ease;
}

.nav--solida {
  background: rgba(20, 5, 5, 0.86);
  backdrop-filter: blur(14px);
  padding-block: 0.9rem;
  box-shadow: 0 1px 0 rgba(252, 213, 191, 0.08);
}

.nav__interior {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav__marca img {
  height: 26px;
  width: auto;
}

.nav__enlaces {
  display: flex;
  gap: 2.6rem;
}

.nav__enlaces a {
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--crema-suave);
  opacity: 0.82;
  position: relative;
  padding-bottom: 4px;
  transition: opacity 0.3s ease;
}

.nav__enlaces a::after {
  content: '';
  position: absolute;
  left: 0;
  right: 100%;
  bottom: 0;
  height: 1px;
  background: var(--crema);
  transition: right 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.nav__enlaces a:hover {
  opacity: 1;
}

.nav__enlaces a:hover::after {
  right: 0;
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
  transition: transform 0.3s ease, opacity 0.3s ease;
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
    background: rgba(20, 5, 5, 0.97);
  }
  .nav__movil a {
    font-family: var(--fuente-display);
    font-size: 1.3rem;
    color: var(--crema-suave);
  }
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

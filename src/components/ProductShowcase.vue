<script setup>
import { ref } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'

import cajaDiagonal from '../assets/product/caja-diagonal.png'
import cajaLibro from '../assets/product/caja-libro.png'
import cajaLarga from '../assets/product/caja-larga.png'

const modulos = [Navigation, EffectFade]

const piezas = [
  {
    numero: '01',
    nombre: 'Amargo 70%',
    categoria: 'Chocolate negro',
    imagen: cajaDiagonal,
    nota: 'Cacao profundo, frutos rojos maduros y un final largo con un sutil toque ahumado.',
    ficha: ['Cacao 70%', 'Elaboración en lotes pequeños', 'Sin relleno añadido'],
    maridaje: ['Vino tinto de cuerpo medio', 'Café de origen', 'Ron añejo'],
    abierto: false,
  },
  {
    numero: '02',
    nombre: 'Leche 50%',
    categoria: 'Chocolate con leche',
    imagen: cajaLibro,
    nota: 'Cremoso y envolvente, con caramelo tostado y un fondo suave de avellana.',
    ficha: ['Cacao 50%', 'Leche entera', 'Avellanas tostadas'],
    maridaje: ['Café con leche', 'Whisky suave', 'Oporto'],
    abierto: false,
  },
  {
    numero: '03',
    nombre: 'Blanco',
    categoria: 'Chocolate blanco',
    imagen: cajaLarga,
    nota: 'Dulzura delicada de manteca de cacao pura, perfumada con vainilla natural.',
    ficha: ['Manteca de cacao pura', 'Vainilla natural', 'Sin colorantes'],
    maridaje: ['Vino espumoso', 'Té blanco', 'Frutos rojos frescos'],
    abierto: false,
  },
]

const activo = ref(0)
const swiperRef = ref(null)

function alCambiar(swiper) {
  activo.value = swiper.activeIndex
}

function alternar(pieza, campo) {
  pieza.abierto = pieza.abierto === campo ? false : campo
}
</script>

<template>
  <section id="coleccion" class="showcase">
    <div class="contenedor showcase__cabecera">
      <p v-reveal class="eyebrow">La colección</p>
      <h2 v-reveal="{ delay: 100 }" class="showcase__titulo">Tres chocolates, un solo oficio</h2>
    </div>

    <div class="showcase__marco contenedor">
      <div class="showcase__contador">
        <span class="activo">{{ piezas[activo].numero }}</span>
        <span class="separador">/</span>
        <span>{{ piezas.length.toString().padStart(2, '0') }}</span>
      </div>

      <Swiper
        ref="swiperRef"
        :modules="modulos"
        effect="fade"
        :fade-effect="{ crossFade: true }"
        :navigation="{ prevEl: '.showcase__flecha--prev', nextEl: '.showcase__flecha--next' }"
        :speed="900"
        class="showcase__swiper"
        @slideChange="alCambiar"
      >
        <SwiperSlide v-for="pieza in piezas" :key="pieza.numero">
          <div class="pieza">
            <div class="pieza__imagen">
              <img :src="pieza.imagen" :alt="`Estuche Cornalinas — ${pieza.nombre}`" />
            </div>

            <div class="pieza__info">
              <span class="pieza__numero">{{ pieza.numero }}</span>
              <p class="pieza__categoria">{{ pieza.categoria }}</p>
              <h3 class="pieza__nombre">{{ pieza.nombre }}</h3>
              <p class="pieza__nota">{{ pieza.nota }}</p>

              <div class="pieza__acordeon">
                <button type="button" @click="alternar(pieza, 'ficha')">
                  Ficha técnica
                  <span :class="{ girar: pieza.abierto === 'ficha' }">＋</span>
                </button>
                <transition name="caer">
                  <ul v-if="pieza.abierto === 'ficha'">
                    <li v-for="item in pieza.ficha" :key="item">{{ item }}</li>
                  </ul>
                </transition>
              </div>

              <div class="pieza__acordeon">
                <button type="button" @click="alternar(pieza, 'maridaje')">
                  Maridaje sugerido
                  <span :class="{ girar: pieza.abierto === 'maridaje' }">＋</span>
                </button>
                <transition name="caer">
                  <ul v-if="pieza.abierto === 'maridaje'">
                    <li v-for="item in pieza.maridaje" :key="item">{{ item }}</li>
                  </ul>
                </transition>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>

      <div class="showcase__navegacion">
        <button class="showcase__flecha showcase__flecha--prev" aria-label="Chocolate anterior">←</button>
        <div class="showcase__linea">
          <span
            v-for="(pieza, i) in piezas"
            :key="pieza.numero"
            :class="{ activa: i === activo }"
          ></span>
        </div>
        <button class="showcase__flecha showcase__flecha--next" aria-label="Siguiente chocolate">→</button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.showcase {
  padding-block: var(--espacio-seccion);
  background: var(--burdeos-carbon);
  position: relative;
}

.showcase__cabecera {
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.showcase__titulo {
  margin-top: 0.9rem;
  font-size: clamp(2rem, 4.4vw, 3.4rem);
  max-width: 22ch;
}

.showcase__marco {
  position: relative;
}

.showcase__contador {
  position: absolute;
  top: -3.2rem;
  right: clamp(1.5rem, 5vw, 4rem);
  font-family: var(--fuente-display);
  font-size: 1.1rem;
  color: var(--crema);
  opacity: 0.75;
  display: flex;
  gap: 0.4rem;
}

.showcase__contador .activo {
  color: var(--blanco);
  opacity: 1;
}

.pieza {
  display: grid;
  grid-template-columns: minmax(0, 0.85fr) minmax(0, 1fr);
  gap: clamp(2rem, 6vw, 6rem);
  align-items: center;
}

.pieza__imagen {
  border-radius: 4px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  background: var(--negro);
}

.pieza__imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.pieza__numero {
  display: block;
  font-family: var(--fuente-display);
  font-size: clamp(3rem, 6vw, 4.5rem);
  color: var(--rojo);
  line-height: 1;
  opacity: 0.85;
}

.pieza__categoria {
  margin-top: 1rem;
  font-size: 0.72rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--crema);
  opacity: 0.75;
}

.pieza__nombre {
  margin-top: 0.6rem;
  font-size: clamp(2rem, 3.6vw, 2.9rem);
}

.pieza__nota {
  margin-top: 1.4rem;
  max-width: 34rem;
  font-size: 1.05rem;
  color: var(--crema-suave);
  opacity: 0.85;
}

.pieza__acordeon {
  margin-top: 1.6rem;
  border-top: 1px solid rgba(252, 213, 191, 0.16);
  padding-top: 1.1rem;
}

.pieza__acordeon button {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: none;
  border: none;
  color: var(--blanco);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  padding: 0;
}

.pieza__acordeon span {
  transition: transform 0.35s ease;
  color: var(--rubi);
  font-size: 1.1rem;
}

.pieza__acordeon span.girar {
  transform: rotate(135deg);
}

.pieza__acordeon ul {
  list-style: none;
  margin: 1rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.pieza__acordeon li {
  font-size: 0.92rem;
  color: var(--crema-suave);
  opacity: 0.8;
  padding-left: 1rem;
  position: relative;
}

.pieza__acordeon li::before {
  content: '—';
  position: absolute;
  left: 0;
  opacity: 0.6;
}

.caer-enter-active,
.caer-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.caer-enter-from,
.caer-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

.showcase__navegacion {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  margin-top: clamp(2.5rem, 6vw, 4rem);
}

.showcase__flecha {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid rgba(252, 213, 191, 0.35);
  background: transparent;
  color: var(--crema-suave);
  font-size: 1.1rem;
  transition: background 0.35s ease, border-color 0.35s ease, color 0.35s ease;
}

.showcase__flecha:hover {
  background: var(--rojo);
  border-color: var(--rojo);
  color: var(--blanco);
}

.showcase__linea {
  display: flex;
  gap: 0.6rem;
}

.showcase__linea span {
  width: 28px;
  height: 2px;
  background: rgba(252, 213, 191, 0.25);
  transition: background 0.4s ease, width 0.4s ease;
}

.showcase__linea span.activa {
  background: var(--rubi);
  width: 44px;
}

@media (max-width: 860px) {
  .pieza {
    grid-template-columns: 1fr;
  }
  .showcase__contador {
    position: static;
    justify-content: flex-end;
    margin-bottom: 1.2rem;
  }
}
</style>

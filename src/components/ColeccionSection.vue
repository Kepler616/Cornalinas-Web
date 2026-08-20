<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import IconoCornalinas from './IconoCornalinas.vue'
import { useCarrito } from '../composables/useCarrito'

import cajaDiagonal from '../assets/product/caja-diagonal.png'
import cajaLibro from '../assets/product/caja-libro.png'
import tableta from '../assets/product/tableta.jpg'

const modulos = [Navigation]
const { productos, cantidades, incrementar, decrementar } = useCarrito()

const medios = {
  'origen-70': { tipo: 'foto', src: tableta },
  'leche-45': { tipo: 'icono', valor: 'tableta' },
  'bombones-6': { tipo: 'foto', src: cajaDiagonal },
  'edicion-especial-9': { tipo: 'foto', src: cajaLibro },
}
</script>

<template>
  <section id="coleccion" class="coleccion">
    <div class="contenedor coleccion__cabecera">
      <p v-reveal class="eyebrow">05 · Nuestra colección</p>
      <h2 v-reveal="{ delay: 100 }" class="coleccion__titulo">
        Pequeñas delicadezas. Grandes emociones.
      </h2>
      <p v-reveal="{ delay: 180 }" class="coleccion__cuerpo">
        Explora nuestra selección y construye tu propio momento Cornalinas.
        <em>Los precios de esta primera propuesta son provisionales.</em>
      </p>
    </div>

    <Swiper
      :modules="modulos"
      :slides-per-view="1.15"
      :space-between="24"
      :grab-cursor="true"
      :navigation="{ prevEl: '.coleccion__flecha--prev', nextEl: '.coleccion__flecha--next' }"
      :breakpoints="{
        640: { slidesPerView: 1.8 },
        980: { slidesPerView: 2.6 },
        1280: { slidesPerView: 3.3 },
      }"
      class="coleccion__swiper"
    >
      <SwiperSlide v-for="producto in productos" :key="producto.id">
        <article class="tarjeta" :class="{ 'tarjeta--destacada': producto.destacado }">
          <span v-if="producto.destacado" class="tarjeta__insignia">Edición limitada</span>

          <div class="tarjeta__medio">
            <img v-if="medios[producto.id].tipo === 'foto'" :src="medios[producto.id].src" :alt="producto.nombre" />
            <IconoCornalinas v-else :tipo="medios[producto.id].valor" class="tarjeta__icono" />
          </div>

          <div class="tarjeta__cuerpo">
            <p class="tarjeta__formato">{{ producto.formato }}</p>
            <h3>{{ producto.nombre }}</h3>
            <p class="tarjeta__descripcion">{{ producto.descripcion }}</p>

            <div class="tarjeta__pie">
              <span class="tarjeta__precio">{{ producto.precio.toFixed(2).replace('.', ',') }} €</span>

              <div class="contador">
                <button type="button" @click="decrementar(producto.id)" :disabled="!cantidades[producto.id]" aria-label="Quitar una unidad">−</button>
                <span>{{ cantidades[producto.id] || 0 }}</span>
                <button type="button" @click="incrementar(producto.id)" aria-label="Añadir una unidad">+</button>
              </div>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <div class="coleccion__navegacion contenedor">
      <button class="coleccion__flecha coleccion__flecha--prev" aria-label="Producto anterior">←</button>
      <button class="coleccion__flecha coleccion__flecha--next" aria-label="Producto siguiente">→</button>
    </div>
  </section>
</template>

<style scoped>
.coleccion {
  padding-block: var(--espacio-seccion);
  background: var(--papel);
}

.coleccion__cabecera {
  max-width: 42rem;
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.coleccion__titulo {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.4vw, 3.4rem);
}

.coleccion__cuerpo {
  margin-top: 1.2rem;
  font-size: 1.05rem;
  color: var(--cacao-suave);
}

.coleccion__cuerpo em {
  font-style: italic;
  opacity: 0.8;
}

.coleccion__swiper {
  padding: 0.5rem clamp(1.5rem, 5vw, 4rem) 1rem;
}

.tarjeta {
  position: relative;
  background: var(--papel-alto);
  border: 1px solid var(--papel-sombra);
  border-radius: 10px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
}

.tarjeta:hover {
  transform: translateY(-6px);
  box-shadow: 0 24px 40px -24px rgba(58, 31, 20, 0.35);
}

.tarjeta--destacada {
  border-color: var(--oro);
  box-shadow: 0 0 0 1px var(--oro);
}

.tarjeta__insignia {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  background: var(--oro);
  color: var(--blanco);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
}

.tarjeta__medio {
  aspect-ratio: 4 / 3;
  background: linear-gradient(160deg, var(--papel-sombra), var(--papel-alto));
  display: flex;
  align-items: center;
  justify-content: center;
}

.tarjeta__medio img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tarjeta__icono {
  width: 30%;
  height: 30%;
  color: var(--rojo);
  opacity: 0.85;
}

.tarjeta__cuerpo {
  padding: 1.6rem 1.6rem 1.8rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tarjeta__formato {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--oro);
}

.tarjeta__cuerpo h3 {
  margin-top: 0.5rem;
  font-size: 1.4rem;
  line-height: 1.2;
}

.tarjeta__descripcion {
  margin-top: 0.8rem;
  font-size: 0.92rem;
  color: var(--cacao-suave);
  flex: 1;
}

.tarjeta__pie {
  margin-top: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tarjeta__precio {
  font-family: var(--fuente-display);
  font-size: 1.5rem;
  color: var(--cacao);
}

.contador {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  border: 1px solid var(--cacao);
  border-radius: 999px;
  padding: 0.3rem 0.5rem;
}

.contador button {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--cacao);
  font-size: 1.05rem;
  line-height: 1;
  transition: background 0.3s ease, color 0.3s ease;
}

.contador button:hover:not(:disabled) {
  background: var(--rojo);
  color: var(--blanco);
}

.contador button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.contador span {
  min-width: 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.coleccion__navegacion {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.coleccion__flecha {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--cacao);
  background: transparent;
  color: var(--cacao);
  font-size: 1.1rem;
  transition: background 0.35s ease, color 0.35s ease;
}

.coleccion__flecha:hover {
  background: var(--rojo);
  border-color: var(--rojo);
  color: var(--blanco);
}
</style>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-coverflow'

import cajaDiagonal from '../assets/product/caja-diagonal.png'
import cajaLibro from '../assets/product/caja-libro.png'
import cajaLarga from '../assets/product/caja-larga.png'
import temperado01 from '../assets/craft/temperado-01.jpg'
import temperado02 from '../assets/craft/temperado-02.jpg'

const modulos = [Autoplay, EffectCoverflow]

const imagenes = [
  { src: cajaLarga, texto: 'Estuche Signature — 9 pralinés' },
  { src: temperado01, texto: 'Temperado artesanal' },
  { src: cajaDiagonal, texto: 'Cornalinas Praline' },
  { src: temperado02, texto: 'Del cacao a la praliné' },
  { src: cajaLibro, texto: 'Apertura en libro' },
]
</script>

<template>
  <section class="galeria">
    <div class="contenedor galeria__cabecera">
      <p v-reveal class="eyebrow">Instantes de la casa</p>
      <h2 v-reveal="{ delay: 100 }">Detrás de cada estuche</h2>
    </div>

    <Swiper
      :modules="modulos"
      effect="coverflow"
      :centered-slides="true"
      :slides-per-view="'auto'"
      :loop="true"
      :autoplay="{ delay: 3200, disableOnInteraction: false }"
      :coverflow-effect="{ rotate: 0, stretch: 0, depth: 160, modifier: 1.6, slideShadows: false }"
      :speed="800"
      class="galeria__swiper"
    >
      <SwiperSlide v-for="img in imagenes" :key="img.texto" class="galeria__slide">
        <img :src="img.src" :alt="img.texto" />
        <p>{{ img.texto }}</p>
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<style scoped>
.galeria {
  padding-block: var(--espacio-seccion);
  background: var(--negro);
  overflow: hidden;
}

.galeria__cabecera {
  margin-bottom: clamp(2.5rem, 6vw, 4rem);
}

.galeria__swiper {
  padding-block: 1rem 2rem;
}

.galeria__slide {
  width: min(340px, 72vw);
  border-radius: 4px;
  overflow: hidden;
  background: var(--burdeos-carbon);
}

.galeria__slide img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  filter: brightness(0.82);
  transition: filter 0.5s ease;
}

.galeria__slide.swiper-slide-active img,
.galeria__slide:hover img {
  filter: brightness(1);
}

.galeria__slide p {
  padding: 1rem 1.2rem 1.3rem;
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  color: var(--crema-suave);
  opacity: 0.8;
}
</style>

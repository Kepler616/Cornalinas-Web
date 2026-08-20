<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import monograma from '../assets/brand/monograma-crema.png'
import fondo from '../assets/craft/temperado-01.jpg'
import DivisorOla from './DivisorOla.vue'

const { t } = useI18n()
const offset = ref(0)

function alScroll() {
  offset.value = window.scrollY * 0.35
}

onMounted(() => window.addEventListener('scroll', alScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', alScroll))
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero__fondo" :style="{ transform: `translateY(${offset}px)` }">
      <img :src="fondo" alt="" aria-hidden="true" />
    </div>
    <div class="hero__velo"></div>
    <div class="hero__vineta"></div>

    <img :src="monograma" alt="" aria-hidden="true" class="hero__monograma" />

    <div class="hero__contenido contenedor">
      <p class="eyebrow eyebrow--claro hero__anim" style="animation-delay: 0.2s">{{ t('hero.eyebrow') }}</p>
      <h1 class="hero__titulo">
        <span class="hero__linea"><span class="hero__anim" style="animation-delay: 0.4s">{{ t('hero.titulo1') }}</span></span>
        <span class="hero__linea"><span class="hero__anim" style="animation-delay: 0.6s">{{ t('hero.titulo2') }}</span></span>
      </h1>
      <p class="hero__lema hero__anim" style="animation-delay: 0.9s">
        {{ t('hero.lema') }}
      </p>
      <div class="hero__acciones hero__anim" style="animation-delay: 1.1s">
        <a href="#historia" class="boton boton--solido">{{ t('hero.cta') }}</a>
      </div>
    </div>

    <a href="#historia" class="hero__scroll" :aria-label="t('hero.scrollAria')">
      <span></span>
      {{ t('hero.scroll') }}
    </a>

    <DivisorOla class="hero__divisor" color="var(--papel)" />
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100svh;
  display: flex;
  align-items: center;
  overflow: hidden;
  background: var(--negro);
}

.hero__fondo {
  position: absolute;
  inset: -10% 0 -10% 0;
  will-change: transform;
}

.hero__fondo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.1) contrast(1.05) brightness(0.5);
}

.hero__velo {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(20, 5, 5, 0.55) 0%, rgba(20, 5, 5, 0.35) 35%, rgba(20, 5, 5, 0.78) 80%, var(--negro) 100%),
    linear-gradient(90deg, rgba(124, 18, 25, 0.55), rgba(20, 5, 5, 0.2) 55%, rgba(124, 18, 25, 0.4));
  mix-blend-mode: multiply;
}

.hero__vineta {
  position: absolute;
  inset: 0;
  box-shadow: inset 0 0 22vw rgba(0, 0, 0, 0.75);
}

.hero__monograma {
  position: absolute;
  right: -6%;
  top: 46%;
  transform: translateY(-50%);
  width: min(48vw, 620px);
  opacity: 0.08;
  filter: blur(0.5px);
}

.hero__contenido {
  position: relative;
  z-index: 2;
  padding-top: 4rem;
}

.hero__titulo {
  font-size: clamp(2.8rem, 7.4vw, 5.6rem);
  line-height: 1.05;
  margin-block: 1rem 1.6rem;
  color: var(--blanco);
  letter-spacing: 0.005em;
  max-width: 16ch;
}

.hero__linea {
  display: block;
  overflow: hidden;
}

.hero__anim {
  display: inline-block;
  opacity: 0;
  transform: translateY(100%);
  animation: subirAparecer 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

p.hero__anim,
div.hero__anim {
  transform: translateY(24px);
}

@keyframes subirAparecer {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero__lema {
  max-width: 32rem;
  font-size: clamp(1rem, 1.6vw, 1.2rem);
  color: var(--crema-suave);
  opacity: 0.92;
  font-weight: 300;
}

.hero__acciones {
  display: flex;
  flex-wrap: wrap;
  gap: 1.1rem;
  margin-top: 2.8rem;
}

.hero__scroll {
  position: absolute;
  bottom: 3.6rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  font-size: 0.68rem;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: var(--crema);
  opacity: 0.8;
}

.hero__scroll span {
  width: 1px;
  height: 42px;
  background: linear-gradient(180deg, var(--crema), transparent);
  animation: bajar 2.2s ease-in-out infinite;
}

.hero__divisor {
  position: absolute;
  bottom: -1px;
  left: 0;
  z-index: 3;
}

@keyframes bajar {
  0% { transform: scaleY(0.3); transform-origin: top; opacity: 0.4; }
  50% { transform: scaleY(1); transform-origin: top; opacity: 1; }
  100% { transform: scaleY(0.3); transform-origin: bottom; opacity: 0.4; }
}

@media (max-width: 640px) {
  .hero__monograma {
    width: 80vw;
    opacity: 0.06;
  }
}
</style>

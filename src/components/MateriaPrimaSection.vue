<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconoCornalinas from './IconoCornalinas.vue'
import foto from '../assets/craft/temperado-02.jpg'
import { useParallax } from '../composables/useParallax'

const { t, tm } = useI18n()
const { el: marco, desplazamiento } = useParallax(0.12)

const iconos = ['hoja', 'grano', 'remolino']

const rasgos = computed(() =>
  tm('materia.rasgos').map((rasgo, i) => ({
    icono: iconos[i],
    etiqueta: rasgo.etiqueta,
    valor: rasgo.valor,
  }))
)
</script>

<template>
  <section id="materia-prima" class="materia">
    <span class="orbe orbe--verde orbe--vagar4 materia__orbe" style="animation-delay: -17s" aria-hidden="true"></span>

    <div class="contenedor materia__grid">
      <div ref="marco" v-reveal="{ tipo: 'escala' }" class="materia__marco">
        <img
          :src="foto"
          :alt="t('materia.foto')"
          :style="{ transform: `translateY(${desplazamiento}px) scale(1.15)` }"
        />
      </div>

      <div class="materia__texto">
        <p v-reveal="{ tipo: 'derecha' }" class="eyebrow">{{ t('materia.eyebrow') }}</p>
        <h2 v-reveal="{ tipo: 'mascara', delay: 80 }" class="materia__titulo">
          <span>{{ t('materia.titulo') }}</span>
        </h2>
        <p v-reveal="{ tipo: 'derecha', delay: 160 }" class="materia__cuerpo">
          {{ t('materia.cuerpo') }}
        </p>

        <ul class="materia__lista">
          <li
            v-for="(rasgo, i) in rasgos"
            :key="rasgo.etiqueta"
            v-reveal="{ tipo: 'derecha', delay: 260 + i * 110 }"
            class="cristal cristal--claro"
          >
            <IconoCornalinas :tipo="rasgo.icono" />
            <div>
              <span>{{ rasgo.etiqueta }}</span>
              <p>{{ rasgo.valor }}</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.materia {
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: var(--papel-alto);
}

.materia__orbe {
  width: 320px;
  height: 320px;
  bottom: -14%;
  left: 42%;
  opacity: 0.3;
}

.materia .materia__grid {
  position: relative;
  z-index: 1;
}

.materia__grid {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}

.materia__marco {
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  aspect-ratio: 4 / 5;
  border: 6px solid var(--papel);
  outline: 1px solid var(--oro);
  outline-offset: -6px;
}

.materia__marco img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  will-change: transform;
  transition: transform 0.1s linear;
}

.materia__titulo {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  max-width: 16ch;
}

.materia__cuerpo {
  margin-top: 1.4rem;
  max-width: 34rem;
  font-size: 1.08rem;
  color: var(--cacao-suave);
}

.materia__lista {
  list-style: none;
  margin: 2.4rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.materia__lista li {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.2rem;
  transition: transform 0.4s ease;
}

.materia__lista li:hover {
  transform: translateX(6px);
}

.materia__lista svg {
  width: 30px;
  height: 30px;
  color: var(--rojo);
  flex-shrink: 0;
}

.materia__lista span {
  display: block;
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--oro);
}

.materia__lista p {
  margin-top: 0.2rem;
  font-family: var(--fuente-display);
  font-size: 1.2rem;
  color: var(--cacao);
}

@media (max-width: 900px) {
  .materia__grid {
    grid-template-columns: 1fr;
  }
}
</style>

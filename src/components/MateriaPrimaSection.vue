<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import IconoCornalinas from './IconoCornalinas.vue'
import fotoGranos from '../assets/materia-prima/granos-cacao.jpg'
// PLACEHOLDER: foto de banco libre (Unsplash), reemplazar con foto propia de la vaina en el árbol
import fotoVaina from '../assets/materia-prima/placeholder-vaina-arbol.jpg'
// PLACEHOLDER: foto de banco libre (Unsplash), reemplazar con foto propia de la cosecha
import fotoCosecha from '../assets/materia-prima/placeholder-cosecha.jpg'
// PLACEHOLDER: foto de banco libre (Pexels), reemplazar con foto propia del secado
import fotoSecado from '../assets/materia-prima/placeholder-secado.jpg'
// PLACEHOLDER: foto de banco libre (Unsplash), reemplazar con foto propia de la recolección
import fotoRecoleccion from '../assets/materia-prima/placeholder-recoleccion.jpg'
// PLACEHOLDER: foto de banco libre (Unsplash), reemplazar con foto propia de la fermentación
import fotoFermentacion from '../assets/materia-prima/placeholder-fermentacion.jpg'
// PLACEHOLDER: foto de banco libre (Unsplash), reemplazar con foto propia de la cosecha en mano
import fotoVainaMano from '../assets/materia-prima/placeholder-vaina-mano.jpg'

const { t, tm } = useI18n()

const iconos = ['hoja', 'grano', 'remolino']

const rasgos = computed(() =>
  tm('materia.rasgos').map((rasgo, i) => ({
    icono: iconos[i],
    etiqueta: rasgo.etiqueta,
    valor: rasgo.valor,
  }))
)

const fotos = computed(() => [
  { src: fotoGranos, alt: t('materia.fotoGranos') },
  { src: fotoVaina, alt: t('materia.fotoVaina') },
  { src: fotoRecoleccion, alt: t('materia.fotoRecoleccion') },
  { src: fotoCosecha, alt: t('materia.fotoCosecha') },
  { src: fotoVainaMano, alt: t('materia.fotoVainaMano') },
  { src: fotoFermentacion, alt: t('materia.fotoFermentacion') },
  { src: fotoSecado, alt: t('materia.fotoSecado') },
])

// Se duplica la tira para que la animación de scroll continuo cierre en loop sin salto.
const fotosPista = computed(() => [...fotos.value, ...fotos.value])
</script>

<template>
  <section id="materia-prima" class="materia">
    <span class="orbe orbe--verde orbe--vagar4 materia__orbe" style="animation-delay: -17s" aria-hidden="true"></span>

    <div class="contenedor materia__grid">
      <div v-reveal="{ tipo: 'escala' }" class="materia__slider">
        <div class="materia__pista">
          <div
            v-for="(foto, i) in fotosPista"
            :key="i"
            class="materia__slide"
            :aria-hidden="i >= fotos.length"
          >
            <img :src="foto.src" :alt="foto.alt" loading="lazy" />
          </div>
        </div>
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
  grid-template-columns: 1.15fr 1fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}

.materia__slider {
  position: relative;
  overflow: hidden;
  mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 6%, black 94%, transparent);
}

.materia__pista {
  display: flex;
  gap: clamp(0.8rem, 1.6vw, 1.2rem);
  width: max-content;
  animation: materia-deslizar 42s linear infinite;
}

.materia__slide {
  position: relative;
  flex: 0 0 auto;
  width: clamp(200px, 21vw, 300px);
  aspect-ratio: 4 / 3;
  border-radius: 6px;
  overflow: hidden;
  border: 6px solid var(--papel);
  outline: 1px solid var(--oro);
  outline-offset: -6px;
}

.materia__slide img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@keyframes materia-deslizar {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .materia__pista {
    animation: none;
  }
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

  .materia__slide {
    width: clamp(140px, 38vw, 200px);
    aspect-ratio: 1 / 1;
  }
}
</style>

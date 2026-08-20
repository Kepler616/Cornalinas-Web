<script setup>
import fondo from '../assets/craft/temperado-02.jpg'

const rasgos = [
  { titulo: 'Hecho a mano', texto: 'Cada tableta se atempera y se moldea de forma manual, pieza por pieza.' },
  { titulo: 'Lotes pequeños', texto: 'Producción limitada para cuidar la textura y el brillo de cada praliné.' },
  { titulo: 'Ingredientes nobles', texto: 'Cacao, manteca de cacao y frutos secos seleccionados, sin atajos.' },
]
</script>

<template>
  <section id="oficio" class="oficio">
    <div class="oficio__fondo">
      <img :src="fondo" alt="" aria-hidden="true" />
    </div>
    <div class="oficio__velo"></div>

    <div class="contenedor oficio__contenido">
      <p v-reveal class="eyebrow">El oficio Cornalinas</p>
      <h2 v-reveal="{ delay: 100 }" class="oficio__titulo">
        Aprendido con paciencia.<br />Elaborado con amor.
      </h2>
      <p v-reveal="{ delay: 180 }" class="oficio__texto">
        Del cacao a la praliné, cada paso ocurre a la temperatura y al ritmo que
        el chocolate exige. No apuramos el temperado ni delegamos el relleno:
        la exclusividad de Cornalinas está en el tiempo que nadie más quiere invertir.
      </p>

      <ul class="oficio__rasgos">
        <li v-for="(rasgo, i) in rasgos" :key="rasgo.titulo" v-reveal="{ delay: 260 + i * 100 }">
          <span class="oficio__numero">{{ (i + 1).toString().padStart(2, '0') }}</span>
          <h3>{{ rasgo.titulo }}</h3>
          <p>{{ rasgo.texto }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.oficio {
  position: relative;
  padding-block: var(--espacio-seccion);
  overflow: hidden;
  background: var(--negro);
}

.oficio__fondo {
  position: absolute;
  inset: 0;
}

.oficio__fondo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(0.4) saturate(1.1);
  transform: scale(1.05);
}

.oficio__velo {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, var(--negro) 0%, rgba(20, 5, 5, 0.55) 22%, rgba(20, 5, 5, 0.72) 75%, var(--negro) 100%);
}

.oficio__contenido {
  position: relative;
  z-index: 1;
}

.oficio__titulo {
  margin-top: 1rem;
  font-size: clamp(2.1rem, 5vw, 3.6rem);
  max-width: 18ch;
}

.oficio__texto {
  margin-top: 1.6rem;
  max-width: 40rem;
  font-size: 1.08rem;
  color: var(--crema-suave);
  opacity: 0.88;
}

.oficio__rasgos {
  list-style: none;
  margin: clamp(3rem, 7vw, 5rem) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 2.4rem;
  border-top: 1px solid rgba(252, 213, 191, 0.18);
  padding-top: 2.6rem;
}

.oficio__numero {
  font-family: var(--fuente-display);
  color: var(--rubi);
  font-size: 1.3rem;
}

.oficio__rasgos h3 {
  margin-top: 0.8rem;
  font-size: 1.3rem;
}

.oficio__rasgos p {
  margin-top: 0.6rem;
  font-size: 0.95rem;
  opacity: 0.78;
}

@media (max-width: 760px) {
  .oficio__rasgos {
    grid-template-columns: 1fr;
  }
}
</style>

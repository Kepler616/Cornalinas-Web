<script setup>
import monograma from '../assets/brand/monograma-rojo.png'
</script>

<template>
  <section class="intro">
    <div class="contenedor intro__grid">
      <img v-reveal :src="monograma" alt="" aria-hidden="true" class="intro__sello" />
      <p v-reveal="{ delay: 120 }" class="intro__texto">
        Cornalinas nace en la cocina de un obrador pequeño, donde cada tableta se
        atempera a mano y cada praliné se rellena, uno a uno, antes de descansar
        en su estuche. No hacemos chocolate en serie: hacemos piezas para
        ocasiones que merecen esperar.
      </p>
    </div>
  </section>
</template>

<style scoped>
.intro {
  padding-block: var(--espacio-seccion);
  background: linear-gradient(180deg, var(--negro), var(--burdeos-carbon));
}

.intro__grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: clamp(2rem, 6vw, 5rem);
  align-items: center;
}

.intro__sello {
  width: clamp(70px, 8vw, 110px);
  opacity: 0.9;
}

.intro__texto {
  font-family: var(--fuente-display);
  font-style: italic;
  font-size: clamp(1.4rem, 2.6vw, 2.1rem);
  font-weight: 400;
  color: var(--crema-suave);
  max-width: 42rem;
}

@media (max-width: 640px) {
  .intro__grid {
    grid-template-columns: 1fr;
    text-align: left;
  }
}
</style>

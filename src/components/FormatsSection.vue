<script setup>
import monograma from '../assets/brand/monograma-rojo.png'

const formatos = [
  {
    cantidad: '6',
    nombre: 'Petite',
    ocasion: 'Un gesto breve pero preciso.',
    detalle: 'La forma más discreta de descubrir Cornalinas.',
  },
  {
    cantidad: '9',
    nombre: 'Signature',
    ocasion: 'Nuestro estuche insignia.',
    detalle: 'Las tres texturas de la casa, en su formato más equilibrado.',
    destacado: true,
  },
  {
    cantidad: '12',
    nombre: 'Maison',
    ocasion: 'Para compartir en la mesa.',
    detalle: 'Pensado para celebraciones que reúnen a varias personas.',
  },
]
</script>

<template>
  <section id="formatos" class="formatos">
    <div class="contenedor">
      <p v-reveal class="eyebrow">Formatos</p>
      <h2 v-reveal="{ delay: 100 }" class="formatos__titulo">Elige tu estuche</h2>

      <div class="formatos__grid">
        <article
          v-for="(formato, i) in formatos"
          :key="formato.cantidad"
          v-reveal="{ delay: 160 + i * 120 }"
          class="tarjeta"
          :class="{ 'tarjeta--destacada': formato.destacado }"
        >
          <img :src="monograma" alt="" aria-hidden="true" class="tarjeta__sello" />
          <span class="tarjeta__cantidad">{{ formato.cantidad }}</span>
          <p class="tarjeta__unidad">pralinés</p>
          <h3>{{ formato.nombre }}</h3>
          <p class="tarjeta__ocasion">{{ formato.ocasion }}</p>
          <p class="tarjeta__detalle">{{ formato.detalle }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.formatos {
  padding-block: var(--espacio-seccion);
  background: var(--burdeos-carbon);
}

.formatos__titulo {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.4vw, 3.4rem);
  margin-bottom: clamp(2.5rem, 6vw, 4.5rem);
}

.formatos__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.6rem;
}

.tarjeta {
  position: relative;
  padding: 2.6rem 2rem;
  border: 1px solid rgba(252, 213, 191, 0.16);
  border-radius: 6px;
  background: linear-gradient(160deg, rgba(159, 30, 33, 0.14), transparent 60%);
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.5s ease;
}

.tarjeta:hover {
  transform: translateY(-8px);
  border-color: rgba(252, 213, 191, 0.4);
}

.tarjeta--destacada {
  background: linear-gradient(160deg, rgba(159, 30, 33, 0.34), rgba(20, 5, 5, 0.2) 65%);
  border-color: var(--rojo);
}

.tarjeta__sello {
  position: absolute;
  top: 1.6rem;
  right: 1.6rem;
  width: 26px;
  opacity: 0.7;
}

.tarjeta__cantidad {
  font-family: var(--fuente-display);
  font-size: 4rem;
  color: var(--blanco);
  line-height: 1;
}

.tarjeta__unidad {
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: var(--crema);
  opacity: 0.7;
  margin-top: 0.4rem;
}

.tarjeta h3 {
  margin-top: 1.6rem;
  font-size: 1.5rem;
}

.tarjeta__ocasion {
  margin-top: 0.6rem;
  font-style: italic;
  font-family: var(--fuente-display);
  color: var(--crema);
  opacity: 0.85;
}

.tarjeta__detalle {
  margin-top: 1rem;
  font-size: 0.92rem;
  color: var(--crema-suave);
  opacity: 0.75;
}

@media (max-width: 860px) {
  .formatos__grid {
    grid-template-columns: 1fr;
  }
}
</style>

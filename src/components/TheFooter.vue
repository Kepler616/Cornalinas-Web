<script setup>
import monograma from '../assets/brand/monograma-crema.png'

const anio = 2026
const paleta = ['#9f1e21', '#fcd5bf', '#7c1219', '#c8252d', '#dd3646']
</script>

<template>
  <footer class="pie">
    <div class="contenedor pie__interior">
      <img :src="monograma" alt="Cornalinas" class="pie__monograma" />

      <nav class="pie__enlaces">
        <a href="#coleccion">Colección</a>
        <a href="#oficio">El Oficio</a>
        <a href="#formatos">Formatos</a>
        <a href="#contacto">Contacto</a>
      </nav>

      <ul class="pie__paleta" aria-hidden="true">
        <li v-for="color in paleta" :key="color" :style="{ background: color }"></li>
      </ul>
    </div>

    <div class="contenedor pie__linea">
      <p>© {{ anio }} Cornalinas. Todos los derechos reservados.</p>
      <p>Hecho a mano, en lotes pequeños.</p>
    </div>
  </footer>
</template>

<style scoped>
.pie {
  background: var(--negro);
  border-top: 1px solid rgba(252, 213, 191, 0.12);
  padding-block: 3rem 2rem;
}

.pie__interior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  padding-bottom: 2rem;
}

.pie__monograma {
  height: 34px;
  width: auto;
  opacity: 0.85;
}

.pie__enlaces {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.pie__enlaces a {
  font-size: 0.78rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--crema-suave);
  opacity: 0.75;
}

.pie__enlaces a:hover {
  opacity: 1;
}

.pie__paleta {
  display: flex;
  gap: 0.4rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.pie__paleta li {
  width: 14px;
  height: 14px;
  border-radius: 50%;
}

.pie__linea {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(252, 213, 191, 0.1);
  font-size: 0.76rem;
  color: var(--crema-suave);
  opacity: 0.55;
}

@media (max-width: 640px) {
  .pie__interior {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

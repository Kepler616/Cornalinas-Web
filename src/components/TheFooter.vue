<script setup>
import monograma from '../assets/brand/monograma-crema.png'

const anio = 2026
const paleta = ['#9f1e21', '#fcd5bf', '#7c1219', '#c8252d', '#dd3646', '#b9853f']
</script>

<template>
  <footer class="pie">
    <div class="contenedor pie__tributo">
      <img v-reveal :src="monograma" alt="Cornalinas" class="pie__monograma" />
      <p v-reveal="{ delay: 80 }" class="eyebrow eyebrow--claro">08 · Con gratitud</p>
      <h2 v-reveal="{ delay: 140 }">Antes que nosotros, están sus manos.</h2>
      <p v-reveal="{ delay: 200 }" class="pie__cuerpo">
        La magia de este chocolate comienza mucho antes de llegar a nuestro
        taller. Rendimos homenaje a las productoras, agricultores y
        comunidades campesinas en Venezuela que cuidan el cacao y hacen
        posible su extraordinaria calidad. Sin su paciencia, conocimiento y
        vínculo con la tierra, Cornalinas simplemente no existiría.
      </p>
      <p v-reveal="{ delay: 260 }" class="pie__cierre">Chocolate venezolano hecho con afecto.</p>
    </div>

    <div class="contenedor pie__linea">
      <nav class="pie__enlaces">
        <a href="#historia">Historia</a>
        <a href="#coleccion">Colección</a>
        <a href="#pedido">Pedido</a>
      </nav>

      <ul class="pie__paleta" aria-hidden="true">
        <li v-for="color in paleta" :key="color" :style="{ background: color }"></li>
      </ul>
    </div>

    <div class="contenedor pie__base">
      <p>hola@cornalinas.com</p>
      <p>© {{ anio }} Cornalinas. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.pie {
  background: var(--negro);
  color: var(--crema-suave);
  padding-block: var(--espacio-seccion) 2.4rem;
}

.pie__tributo {
  max-width: 44rem;
  text-align: center;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pie__monograma {
  width: 44px;
  margin-bottom: 1.6rem;
  opacity: 0.85;
}

.pie__tributo h2 {
  margin-top: 1rem;
  color: var(--blanco);
  font-size: clamp(2rem, 4.6vw, 3rem);
}

.pie__cuerpo {
  margin-top: 1.4rem;
  opacity: 0.82;
  font-size: 1.05rem;
}

.pie__cierre {
  margin-top: 2rem;
  font-size: 0.78rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: var(--oro-brillo);
}

.pie__linea {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.6rem;
  margin-top: clamp(3rem, 7vw, 5rem);
  padding-top: 2rem;
  border-top: 1px solid rgba(252, 213, 191, 0.12);
}

.pie__enlaces {
  display: flex;
  gap: 2rem;
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

.pie__base {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin-top: 1.6rem;
  padding-top: 1.6rem;
  border-top: 1px solid rgba(252, 213, 191, 0.1);
  font-size: 0.76rem;
  color: var(--crema-suave);
  opacity: 0.55;
}

@media (max-width: 640px) {
  .pie__linea {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>

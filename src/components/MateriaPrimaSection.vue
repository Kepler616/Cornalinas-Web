<script setup>
import IconoCornalinas from './IconoCornalinas.vue'
import foto from '../assets/craft/temperado-02.jpg'

const rasgos = [
  { icono: 'hoja', etiqueta: 'Origen', valor: 'Venezuela' },
  { icono: 'grano', etiqueta: 'Perfil', valor: 'Frutal · Floral · Profundo' },
  { icono: 'remolino', etiqueta: 'Proceso', valor: 'Artesanal en pequeñas partidas' },
]
</script>

<template>
  <section id="materia-prima" class="materia">
    <div class="contenedor materia__grid">
      <div v-reveal class="materia__marco">
        <img :src="foto" alt="Temperado artesanal del chocolate Cornalinas" />
      </div>

      <div class="materia__texto">
        <p v-reveal="{ delay: 100 }" class="eyebrow">04 · Materia prima</p>
        <h2 v-reveal="{ delay: 160 }" class="materia__titulo">
          Venezuela en cada nota de sabor.
        </h2>
        <p v-reveal="{ delay: 220 }" class="materia__cuerpo">
          Nuestro cacao es el protagonista indiscutible. Complejo, aromático y
          lleno de vida. Es una materia prima que habla directamente de su
          tierra y de la sabiduría ancestral de quienes la cultivan.
        </p>

        <ul class="materia__lista">
          <li v-for="(rasgo, i) in rasgos" :key="rasgo.etiqueta" v-reveal="{ delay: 300 + i * 100 }">
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
  padding-block: var(--espacio-seccion);
  background: var(--papel-alto);
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

<script setup>
import IconoCornalinas from './IconoCornalinas.vue'

const pasos = [
  { numero: '01', titulo: 'Selección', icono: 'grano', texto: 'Elegimos pacientemente los mejores granos de nuestras tierras.' },
  { numero: '02', titulo: 'Tostado', icono: 'fuego', texto: 'Despertamos los aromas y matices ocultos con precisión térmica.' },
  { numero: '03', titulo: 'Refinado', icono: 'remolino', texto: 'Logramos texturas sedosas que se funden perfectamente en el paladar.' },
  { numero: '04', titulo: 'Templado', icono: 'brillo', texto: 'El toque maestro para un brillo impecable y el crujido perfecto.' },
]
</script>

<template>
  <section id="proceso" class="proceso">
    <div class="contenedor">
      <div class="proceso__cabecera">
        <p v-reveal class="eyebrow eyebrow--claro">03 · Proceso Bean to Bar</p>
        <h2 v-reveal="{ delay: 100 }" class="proceso__titulo">
          Del grano a la tableta: el respeto por el origen.
        </h2>
        <p v-reveal="{ delay: 180 }" class="proceso__cuerpo">
          Creemos en el movimiento Bean to Bar porque es la única forma de
          honrar el verdadero carácter del cacao. Acompañamos cada semilla
          desde que nace hasta que llega a tus manos, trabajando en pequeños
          lotes para cuidar cada detalle.
        </p>
      </div>

      <ol class="proceso__pasos">
        <li v-for="(paso, i) in pasos" :key="paso.numero" v-reveal="{ delay: 260 + i * 110 }">
          <div class="proceso__icono">
            <IconoCornalinas :tipo="paso.icono" />
          </div>
          <span class="proceso__numero">{{ paso.numero }}</span>
          <h3>{{ paso.titulo }}</h3>
          <p>{{ paso.texto }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.proceso {
  padding-block: var(--espacio-seccion);
  background: var(--cacao);
  color: var(--crema-suave);
}

.proceso__cabecera {
  max-width: 44rem;
}

.proceso__titulo {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  color: var(--papel-alto);
}

.proceso__cuerpo {
  margin-top: 1.4rem;
  font-size: 1.08rem;
  opacity: 0.82;
}

.proceso__pasos {
  list-style: none;
  margin: clamp(3rem, 7vw, 5rem) 0 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 2.2rem;
  position: relative;
}

.proceso__pasos::before {
  content: '';
  position: absolute;
  top: 22px;
  left: 5%;
  right: 5%;
  height: 0;
  border-top: 2px dotted var(--oro);
  opacity: 0.55;
}

.proceso__pasos li {
  position: relative;
}

.proceso__icono {
  width: 44px;
  height: 44px;
  color: var(--oro-brillo);
  position: relative;
  z-index: 1;
  background: var(--cacao);
  padding-right: 4px;
}

.proceso__numero {
  display: block;
  margin-top: 1rem;
  font-family: var(--fuente-display);
  font-style: italic;
  color: var(--oro-brillo);
  font-size: 1rem;
}

.proceso__pasos h3 {
  margin-top: 0.5rem;
  color: var(--papel-alto);
  font-size: 1.4rem;
}

.proceso__pasos p {
  margin-top: 0.6rem;
  font-size: 0.94rem;
  opacity: 0.78;
}

@media (max-width: 860px) {
  .proceso__pasos {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  .proceso__pasos::before {
    display: none;
  }
}
</style>

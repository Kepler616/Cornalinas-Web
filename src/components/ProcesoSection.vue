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
    <span class="orbe orbe--oro orbe--vagar1 proceso__orbe1" style="animation-delay: -11s" aria-hidden="true"></span>
    <span class="orbe orbe--rubi orbe--vagar3 proceso__orbe2" style="animation-delay: -6s" aria-hidden="true"></span>

    <div class="contenedor">
      <div class="proceso__cabecera">
        <p v-reveal="{ tipo: 'izquierda' }" class="eyebrow eyebrow--claro">03 · Proceso Bean to Bar</p>
        <h2 v-reveal="{ tipo: 'mascara' }" class="proceso__titulo">
          <span>Del grano a la tableta: el respeto por el origen.</span>
        </h2>
        <p v-reveal="{ tipo: 'izquierda', delay: 140 }" class="proceso__cuerpo">
          Creemos en el movimiento Bean to Bar porque es la única forma de
          honrar el verdadero carácter del cacao. Acompañamos cada semilla
          desde que nace hasta que llega a tus manos, trabajando en pequeños
          lotes para cuidar cada detalle.
        </p>
      </div>

      <ol class="proceso__pasos">
        <li v-for="(paso, i) in pasos" :key="paso.numero" v-reveal="{ tipo: 'escala', delay: 220 + i * 140 }" class="cristal cristal--oscuro">
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
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: var(--cacao);
  color: var(--crema-suave);
}

.proceso__orbe1 {
  width: 360px;
  height: 360px;
  top: -8%;
  left: -6%;
}

.proceso__orbe2 {
  width: 300px;
  height: 300px;
  bottom: -12%;
  right: 4%;
  animation-delay: -8s;
}

.proceso .contenedor {
  position: relative;
  z-index: 1;
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
  top: 44px;
  left: 5%;
  right: 5%;
  height: 0;
  border-top: 2px dotted var(--oro);
  opacity: 0.4;
  z-index: -1;
}

.proceso__pasos li {
  position: relative;
  padding: 1.8rem 1.6rem 2rem;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
}

.proceso__pasos li:hover {
  transform: translateY(-6px);
}

.proceso__icono {
  width: 44px;
  height: 44px;
  color: var(--oro-brillo);
  transition: transform 0.5s ease;
}

.proceso__pasos li:hover .proceso__icono {
  transform: rotate(-8deg) scale(1.08);
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

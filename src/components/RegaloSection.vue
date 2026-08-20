<script setup>
import IconoCornalinas from './IconoCornalinas.vue'
import { useParallax } from '../composables/useParallax'

const { el: marca, desplazamiento } = useParallax(0.18)
</script>

<template>
  <section class="regalo">
    <div ref="marca" class="regalo__marca" :style="{ transform: `translateY(${desplazamiento}px) rotate(${desplazamiento * 0.05}deg)` }">
      <IconoCornalinas tipo="regalo" />
    </div>

    <div v-reveal="{ tipo: 'escala' }" class="contenedor regalo__caja cristal cristal--oscuro">
      <p class="eyebrow eyebrow--claro">07 · Para regalar</p>
      <h2 v-reveal="{ tipo: 'mascara' }"><span>Hay afectos que saben a chocolate.</span></h2>
      <p>
        Porque un chocolate es un abrazo que se puede comer. Comparte un
        pedacito de nuestra historia con quien más quieres.
      </p>
      <a href="#coleccion" class="boton boton--claro">
        Elegir un detalle para regalar →
      </a>
    </div>
  </section>
</template>

<style scoped>
.regalo {
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: radial-gradient(120% 160% at 15% 0%, var(--oro-brillo) 0%, var(--oro) 45%, var(--burdeos) 100%);
  text-align: center;
}

.regalo__marca {
  position: absolute;
  right: -6%;
  bottom: -12%;
  width: min(42vw, 460px);
  height: min(42vw, 460px);
  color: var(--blanco);
  opacity: 0.14;
  will-change: transform;
  transition: transform 0.1s linear;
}

.regalo__marca :deep(svg) {
  width: 100%;
  height: 100%;
  display: block;
}

.regalo__caja {
  position: relative;
  z-index: 1;
  max-width: 42rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: clamp(2rem, 5vw, 3.4rem) clamp(1.6rem, 4vw, 3rem);
}

.regalo__caja h2 {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.6vw, 3.2rem);
  color: var(--blanco);
}

.regalo__caja p {
  margin-top: 1.2rem;
  color: var(--crema-suave);
  font-size: 1.08rem;
}

.regalo__caja .boton {
  margin-top: 2rem;
  border-color: var(--blanco);
  color: var(--blanco);
}

.regalo__caja .boton:hover {
  background: var(--blanco);
  color: var(--burdeos);
}
</style>

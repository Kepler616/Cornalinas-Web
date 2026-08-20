<script setup>
import IconoCornalinas from './IconoCornalinas.vue'
</script>

<template>
  <section class="regalo">
    <IconoCornalinas tipo="regalo" class="regalo__marca" />

    <div class="contenedor regalo__caja">
      <p v-reveal class="eyebrow eyebrow--claro">07 · Para regalar</p>
      <h2 v-reveal="{ delay: 100 }">Hay afectos que saben a chocolate.</h2>
      <p v-reveal="{ delay: 180 }">
        Porque un chocolate es un abrazo que se puede comer. Comparte un
        pedacito de nuestra historia con quien más quieres.
      </p>
      <a v-reveal="{ delay: 260 }" href="#coleccion" class="boton boton--claro">
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
  height: auto;
  color: var(--blanco);
  opacity: 0.14;
}

.regalo__caja {
  position: relative;
  z-index: 1;
  max-width: 42rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
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

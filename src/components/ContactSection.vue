<script setup>
import logoRojo from '../assets/brand/logotipo-rojo.png'
</script>

<template>
  <section id="contacto" class="cta">
    <div class="contenedor cta__caja">
      <img :src="logoRojo" alt="Cornalinas" class="cta__logo" />
      <h2 v-reveal>Reserva tu estuche antes de que se agote el lote.</h2>
      <p v-reveal="{ delay: 100 }">
        Escríbenos para pedidos, regalos corporativos o distribución.
        Respondemos personalmente cada solicitud.
      </p>
      <div v-reveal="{ delay: 180 }" class="cta__acciones">
        <a href="mailto:hola@cornalinas.com" class="boton boton--solido">hola@cornalinas.com</a>
        <a href="#" class="boton">Seguir en Instagram</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cta {
  padding-block: var(--espacio-seccion);
  background: radial-gradient(120% 140% at 50% 0%, var(--rojo) 0%, var(--burdeos) 42%, var(--negro) 100%);
  text-align: center;
}

.cta__caja {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 46rem;
}

.cta__logo {
  height: 34px;
  width: auto;
  filter: brightness(0) invert(1);
  margin-bottom: 2.2rem;
  opacity: 0.9;
}

.cta h2 {
  font-size: clamp(1.9rem, 4.4vw, 3rem);
  max-width: 20ch;
}

.cta p {
  margin-top: 1.4rem;
  color: var(--crema-suave);
  opacity: 0.85;
  max-width: 32rem;
}

.cta__acciones {
  margin-top: 2.4rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.1rem;
}

.cta .boton--solido {
  background: var(--negro);
  border-color: var(--negro);
}

.cta .boton--solido:hover {
  background: var(--blanco);
  border-color: var(--blanco);
  color: var(--negro);
}

.cta .boton:not(.boton--solido) {
  border-color: rgba(255, 255, 255, 0.5);
}

.cta .boton:not(.boton--solido):hover {
  background: var(--blanco);
  color: var(--rojo);
}
</style>

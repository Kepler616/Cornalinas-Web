<script setup>
import IconoCornalinas from './IconoCornalinas.vue'
import monograma from '../assets/brand/monograma-rojo.png'
</script>

<template>
  <section id="historia" class="historia">
    <div class="contenedor historia__grid">
      <div class="historia__texto">
        <p v-reveal class="eyebrow">02 · Nuestra historia</p>
        <h2 v-reveal="{ delay: 100 }" class="historia__titulo">
          De Venezuela, con el corazón en las manos.
        </h2>
        <p v-reveal="{ delay: 180 }" class="historia__cuerpo capitular">
          Cornalinas es más que una chocolatería; es nuestro puente de conexión.
          Nacimos de la profunda nostalgia por los sabores de nuestra tierra y
          el anhelo de compartirlos. Aquí unimos nuestras raíces venezolanas,
          el meticuloso oficio artesanal y una nueva vida en Alemania. Cada
          pieza que creamos guarda una memoria: una sobremesa en familia, un
          regalo inesperado o la forma más dulce de decir «estoy contigo».
        </p>
      </div>

      <div v-reveal="{ delay: 260 }" class="historia__mapa">
        <img :src="monograma" alt="" aria-hidden="true" class="historia__sello" />
        <div class="ruta">
          <div class="ruta__punto">
            <IconoCornalinas tipo="hoja" class="ruta__icono" />
            <span>Venezuela</span>
          </div>
          <IconoCornalinas tipo="ruta" class="ruta__linea" />
          <div class="ruta__punto">
            <IconoCornalinas tipo="grano" class="ruta__icono" />
            <span>Berlín</span>
          </div>
        </div>
        <p class="ruta__pie">El cacao viaja; el afecto se queda.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.historia {
  padding-block: var(--espacio-seccion);
  background: var(--papel);
}

.historia__grid {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;
}

.historia__titulo {
  margin-top: 1rem;
  font-size: clamp(2.1rem, 4.6vw, 3.4rem);
  max-width: 16ch;
}

.historia__cuerpo {
  margin-top: 1.8rem;
  max-width: 38rem;
  font-size: 1.12rem;
  color: var(--cacao-suave);
}

.historia__mapa {
  position: relative;
  background: var(--papel-alto);
  border: 1px solid var(--papel-sombra);
  border-radius: 10px;
  padding: clamp(2rem, 4vw, 3rem);
  text-align: center;
}

.historia__sello {
  width: 46px;
  margin-inline: auto;
  opacity: 0.85;
}

.ruta {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  margin-top: 1.8rem;
}

.ruta__punto {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

.ruta__icono {
  width: 34px;
  height: 34px;
  color: var(--rojo);
}

.ruta__punto span {
  font-family: var(--fuente-display);
  font-style: italic;
  font-size: 1.05rem;
  color: var(--cacao);
}

.ruta__linea {
  width: 90px;
  height: 34px;
  color: var(--oro);
  flex-shrink: 0;
}

.ruta__pie {
  margin-top: 1.8rem;
  font-family: var(--fuente-display);
  font-style: italic;
  color: var(--cacao-suave);
  font-size: 1.05rem;
}

@media (max-width: 900px) {
  .historia__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .ruta {
    gap: 0.3rem;
  }
  .ruta__linea {
    width: 50px;
  }
}
</style>

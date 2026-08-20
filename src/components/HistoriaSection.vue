<script setup>
import { useI18n } from 'vue-i18n'
import IconoCornalinas from './IconoCornalinas.vue'
import monograma from '../assets/brand/monograma-rojo.png'

const { t } = useI18n()
</script>

<template>
  <section id="historia" class="historia">
    <span class="orbe orbe--oro orbe--vagar1 historia__orbe" style="animation-delay: -4s" aria-hidden="true"></span>

    <div class="contenedor historia__grid">
      <div class="historia__texto">
        <p v-reveal="{ tipo: 'izquierda' }" class="eyebrow">{{ t('historia.eyebrow') }}</p>
        <h2 v-reveal="{ tipo: 'mascara' }" class="historia__titulo">
          <span>{{ t('historia.titulo') }}</span>
        </h2>
        <p v-reveal="{ tipo: 'izquierda', delay: 120 }" class="historia__cuerpo capitular">
          {{ t('historia.cuerpo') }}
        </p>
      </div>

      <div v-reveal="{ tipo: 'derecha', delay: 160 }" class="historia__mapa cristal cristal--claro">
        <img :src="monograma" alt="" aria-hidden="true" class="historia__sello" />
        <div class="ruta">
          <div class="ruta__punto">
            <IconoCornalinas tipo="hoja" class="ruta__icono" />
            <span>{{ t('historia.venezuela') }}</span>
          </div>
          <IconoCornalinas tipo="ruta" class="ruta__linea" />
          <div class="ruta__punto">
            <IconoCornalinas tipo="grano" class="ruta__icono" />
            <span>{{ t('historia.berlin') }}</span>
          </div>
        </div>
        <p class="ruta__pie">{{ t('historia.pie') }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.historia {
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: var(--papel);
}

.historia__orbe {
  width: 380px;
  height: 380px;
  top: -10%;
  right: 8%;
}

.historia__grid {
  position: relative;
  z-index: 1;
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

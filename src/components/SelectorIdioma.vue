<script setup>
import { useI18n } from 'vue-i18n'
import { cambiarIdioma } from '../i18n.js'

defineProps({
  oscuro: { type: Boolean, default: false },
})

const { locale } = useI18n()

const idiomas = [
  { codigo: 'es', etiqueta: 'ES' },
  { codigo: 'en', etiqueta: 'EN' },
  { codigo: 'de', etiqueta: 'DE' },
]
</script>

<template>
  <div class="selector" :class="{ 'selector--oscuro': oscuro }" role="group" aria-label="Idioma / Language / Sprache">
    <button
      v-for="idioma in idiomas"
      :key="idioma.codigo"
      type="button"
      class="selector__opcion"
      :class="{ activo: locale === idioma.codigo }"
      :aria-pressed="locale === idioma.codigo"
      @click="cambiarIdioma(idioma.codigo)"
    >
      {{ idioma.etiqueta }}
    </button>
  </div>
</template>

<style scoped>
.selector {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 3px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(255, 255, 255, 0.06);
}

.selector--oscuro {
  border-color: rgba(58, 31, 20, 0.25);
  background: rgba(58, 31, 20, 0.06);
}

.selector__opcion {
  border: none;
  background: transparent;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  color: inherit;
  opacity: 0.65;
  transition: background 0.3s ease, opacity 0.3s ease, color 0.3s ease;
}

.selector__opcion:hover {
  opacity: 1;
}

.selector__opcion.activo {
  opacity: 1;
  background: var(--rojo);
  color: var(--blanco);
}
</style>

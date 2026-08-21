<script setup>
import { useI18n } from 'vue-i18n'
import { cambiarIdioma } from '../i18n.js'

defineProps({
  oscuro: { type: Boolean, default: false },
  flotante: { type: Boolean, default: false },
})

const { locale } = useI18n()

const idiomas = [
  { codigo: 'es', etiqueta: 'ES' },
  { codigo: 'en', etiqueta: 'EN' },
  { codigo: 'de', etiqueta: 'DE' },
]
</script>

<template>
  <div
    class="selector"
    :class="{ 'selector--oscuro': oscuro, 'selector--flotante': flotante }"
    role="group"
    aria-label="Idioma / Language / Sprache"
  >
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
  border: 1px solid rgba(255, 244, 224, 0.3);
  background: rgba(20, 5, 5, 0.35);
}

.selector--oscuro {
  border-color: rgba(58, 31, 20, 0.25);
  background: rgba(58, 31, 20, 0.08);
}

.selector__opcion {
  border: none;
  background: transparent;
  padding: 0.3rem 0.55rem;
  border-radius: 999px;
  font-size: 0.66rem;
  letter-spacing: 0.08em;
  /* No usar color:inherit — este componente aparece sobre fondos muy
     distintos (hero oscuro, header claro al hacer scroll, menú móvil
     oscuro) y heredar el color del contexto dejaba las opciones no
     activas invisibles la mitad de las veces. */
  color: var(--crema-suave);
  opacity: 0.7;
  transition: background 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.3s ease,
    color 0.3s ease, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.selector--oscuro .selector__opcion {
  color: var(--cacao);
}

.selector__opcion:hover {
  opacity: 1;
}

.selector__opcion:active {
  transform: scale(0.88);
}

.selector__opcion.activo {
  opacity: 1;
  background: var(--rojo);
  color: var(--blanco);
  transform: scale(1.08);
}

.selector--flotante {
  display: none;
}

@media (max-width: 860px) {
  .selector--flotante {
    display: inline-flex;
    position: fixed;
    right: 1.1rem;
    bottom: 1.1rem;
    z-index: 90;
    background: var(--cristal-oscuro-fondo);
    backdrop-filter: blur(16px) saturate(160%);
    box-shadow: 0 14px 30px -10px rgba(0, 0, 0, 0.55);
  }
}

@media (prefers-reduced-transparency: reduce) {
  .selector--flotante { background: var(--cristal-oscuro-fondo-solido); }
}
@supports not ((backdrop-filter: blur(1px)) or (-webkit-backdrop-filter: blur(1px))) {
  .selector--flotante { background: var(--cristal-oscuro-fondo-solido); }
}
</style>

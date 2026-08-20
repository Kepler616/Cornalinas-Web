<script setup>
defineProps({
  tipo: { type: String, required: true },
})
</script>

<template>
  <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <template v-if="tipo === 'grano'">
      <path d="M24 6c8 3 13 12 13 20 0 9-6 16-13 16S11 35 11 26c0-8 5-17 13-20Z" />
      <path d="M24 9v33" />
      <path d="M17 16c3 2 5 4.5 5 8" />
      <path d="M31 16c-3 2-5 4.5-5 8" />
      <path d="M15 27c3 1.5 6 3 9 3s6-1.5 9-3" />
    </template>

    <template v-else-if="tipo === 'fuego'">
      <path d="M24 44c7.5 0 12-5.4 12-12 0-5-2.6-8-5-11 .3 3-1 5-2.6 6 .3-6-2-11-7-15 1 5-1 9-4.4 12.4C14.4 27 12 30 12 34c0 6.5 5.5 10 12 10Z" />
      <path d="M24 39c2.6 0 4.5-1.9 4.5-4.4 0-2-1.4-3.4-2.6-4.6.2 1.4-.4 2.3-1.2 2.8.2-2.4-.8-4.2-2.6-5.6.4 2-.4 3.5-1.8 4.8-1.4 1.3-2.3 2.6-2.3 4.4 0 2.6 2 4.6 6 2.6Z" />
    </template>

    <template v-else-if="tipo === 'remolino'">
      <path d="M24 8a16 16 0 1 0 11.3 27.3" />
      <path d="M24 15a9 9 0 1 0 6.4 15.4" />
      <path d="M24 22a2.6 2.6 0 1 0 1.8 4.4" />
    </template>

    <template v-else-if="tipo === 'brillo'">
      <path d="M24 5c1 6.5 3 10 9.5 11-6.5 1-8.5 4.5-9.5 11-1-6.5-3-10-9.5-11 6.5-1 8.5-4.5 9.5-11Z" />
      <path d="M37 30c.6 3.2 1.6 4.4 4.8 5-3.2.6-4.2 1.8-4.8 5-.6-3.2-1.6-4.4-4.8-5 3.2-.6 4.2-1.8 4.8-5Z" />
      <path d="M10 29c.5 2.6 1.3 3.5 3.8 4-2.5.5-3.3 1.4-3.8 4-.5-2.6-1.3-3.5-3.8-4 2.5-.5 3.3-1.4 3.8-4Z" />
    </template>

    <template v-else-if="tipo === 'tableta'">
      <rect x="7" y="12" width="34" height="24" rx="2.5" />
      <path d="M24 12v24M7 24h34M15.5 12v24M32.5 12v24" />
    </template>

    <template v-else-if="tipo === 'bombon'">
      <path d="M24 8c7 6 13 13.5 13 21A13 13 0 0 1 11 29c0-7.5 6-15 13-21Z" />
      <path d="M17.5 27c1.8 3.2 3.8 5 6.5 5s4.7-1.8 6.5-5" />
    </template>

    <template v-else-if="tipo === 'regalo'">
      <rect x="8" y="18" width="32" height="22" rx="1.5" />
      <path d="M8 26h32" />
      <path d="M24 18v22" />
      <path d="M24 18c-3-6-8-8-9.5-6S15 18 24 18Z" />
      <path d="M24 18c3-6 8-8 9.5-6S33 18 24 18Z" />
    </template>

    <template v-else-if="tipo === 'hoja'">
      <path d="M12 34C10 20 20 8 36 7c1 16-9 26-24 27Z" />
      <path d="M12 34c5-7 12-13 22-22" />
    </template>

    <template v-else-if="tipo === 'ruta'">
      <circle cx="9" cy="34" r="3.4" />
      <circle cx="39" cy="12" r="3.4" />
      <path d="M12.3 32C20 26 28 22 35.8 14.5" stroke-dasharray="1 6" />
    </template>
  </svg>
</template>

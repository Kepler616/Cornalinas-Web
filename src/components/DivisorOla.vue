<script setup>
defineProps({
  color: { type: String, default: 'var(--papel)' },
  voltear: { type: Boolean, default: false },
})
</script>

<template>
  <span class="divisor" :style="{ transform: voltear ? 'scaleY(-1)' : 'none' }" aria-hidden="true">
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none">
      <path
        :fill="color"
        d="M0,32 C150,70 300,0 450,24 C600,48 750,76 900,48 C1020,26 1140,10 1200,20 L1200,80 L0,80 Z"
      />
    </svg>
  </span>
</template>

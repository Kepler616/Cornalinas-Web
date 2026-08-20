<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const porcentaje = ref(0)

function alScroll() {
  const alto = document.documentElement.scrollHeight - window.innerHeight
  porcentaje.value = alto > 0 ? (window.scrollY / alto) * 100 : 0
}

onMounted(() => window.addEventListener('scroll', alScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', alScroll))
</script>

<template>
  <div class="progreso" :style="{ width: porcentaje + '%' }" aria-hidden="true"></div>
</template>

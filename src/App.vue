<script setup>
import TheHeader from './components/TheHeader.vue'
import HeroSection from './components/HeroSection.vue'
import HistoriaSection from './components/HistoriaSection.vue'
import ProcesoSection from './components/ProcesoSection.vue'
import MateriaPrimaSection from './components/MateriaPrimaSection.vue'
import ColeccionSection from './components/ColeccionSection.vue'
import PedidoSection from './components/PedidoSection.vue'
import RegaloSection from './components/RegaloSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="grano" aria-hidden="true"></div>
  <TheHeader />
  <main>
    <HeroSection />
    <HistoriaSection />
    <ProcesoSection />
    <MateriaPrimaSection />
    <ColeccionSection />
    <PedidoSection />
    <RegaloSection />
  </main>
  <TheFooter />
</template>

<script setup>
import TheNavbar from './components/TheNavbar.vue'
import HeroSection from './components/HeroSection.vue'
import IntroSection from './components/IntroSection.vue'
import ProductShowcase from './components/ProductShowcase.vue'
import CraftSection from './components/CraftSection.vue'
import FormatsSection from './components/FormatsSection.vue'
import GallerySection from './components/GallerySection.vue'
import ContactSection from './components/ContactSection.vue'
import TheFooter from './components/TheFooter.vue'
</script>

<template>
  <div class="grano" aria-hidden="true"></div>
  <TheNavbar />
  <main>
    <HeroSection />
    <IntroSection />
    <ProductShowcase />
    <CraftSection />
    <FormatsSection />
    <GallerySection />
    <ContactSection />
  </main>
  <TheFooter />
</template>

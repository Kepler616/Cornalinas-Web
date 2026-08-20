import { ref, onMounted, onUnmounted } from 'vue'

export function useParallax(factor = 0.2) {
  const el = ref(null)
  const desplazamiento = ref(0)
  let ticking = false

  function medir() {
    ticking = false
    if (!el.value) return
    const rect = el.value.getBoundingClientRect()
    const centro = rect.top + rect.height / 2 - window.innerHeight / 2
    desplazamiento.value = centro * -factor
  }

  function alScroll() {
    if (ticking) return
    ticking = true
    requestAnimationFrame(medir)
  }

  onMounted(() => {
    medir()
    window.addEventListener('scroll', alScroll, { passive: true })
    window.addEventListener('resize', alScroll)
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', alScroll)
    window.removeEventListener('resize', alScroll)
  })

  return { el, desplazamiento }
}

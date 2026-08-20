const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('visible', entry.isIntersecting)
    })
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
)

export const reveal = {
  mounted(el, binding) {
    const opciones = typeof binding.value === 'object' && binding.value !== null ? binding.value : {}
    const tipo = opciones.tipo || 'subir'

    el.classList.add('reveal')
    if (tipo !== 'subir') {
      el.classList.add(`reveal--${tipo}`)
    }
    if (opciones.delay) {
      el.style.transitionDelay = `${opciones.delay}ms`
      if (tipo === 'mascara') {
        el.querySelectorAll(':scope > *').forEach((hijo) => {
          hijo.style.transitionDelay = `${opciones.delay}ms`
        })
      }
    }
    observer.observe(el)
  },
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.18, rootMargin: '0px 0px -8% 0px' }
)

export const reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value?.delay) {
      el.style.transitionDelay = `${binding.value.delay}ms`
    }
    observer.observe(el)
  },
}

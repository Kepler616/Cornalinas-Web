import { createI18n } from 'vue-i18n'
import es from './locales/es.js'
import en from './locales/en.js'
import de from './locales/de.js'

export const IDIOMAS_DISPONIBLES = ['es', 'en', 'de']
const CLAVE_ALMACENAMIENTO = 'cornalinas-idioma'

function detectarIdiomaInicial() {
  const guardado = localStorage.getItem(CLAVE_ALMACENAMIENTO)
  if (IDIOMAS_DISPONIBLES.includes(guardado)) return guardado

  const idiomaNavegador = (navigator.language || 'es').slice(0, 2).toLowerCase()
  if (IDIOMAS_DISPONIBLES.includes(idiomaNavegador)) return idiomaNavegador

  return 'es'
}

export const i18n = createI18n({
  legacy: false,
  locale: detectarIdiomaInicial(),
  fallbackLocale: 'es',
  messages: { es, en, de },
})

export function cambiarIdioma(codigo) {
  if (!IDIOMAS_DISPONIBLES.includes(codigo)) return
  i18n.global.locale.value = codigo
  localStorage.setItem(CLAVE_ALMACENAMIENTO, codigo)
  document.documentElement.lang = codigo
  document.title = i18n.global.t('meta.title')
  const meta = document.querySelector('meta[name="description"]')
  if (meta) meta.setAttribute('content', i18n.global.t('meta.description'))
}

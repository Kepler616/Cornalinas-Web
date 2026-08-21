<script setup>
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import IconoCornalinas from './IconoCornalinas.vue'
import { useCarrito } from '../composables/useCarrito'

import cajaDiagonal from '../assets/product/caja-diagonal.png'
import cajaLibro from '../assets/product/caja-libro.png'
import tabletaOrigen from '../assets/product/tableta-origen.jpg'
import tabletaLeche from '../assets/product/tableta-leche.jpg'

const { t, tm } = useI18n()
const modulos = [Navigation]
const { productos: catalogo, cantidades, incrementar, decrementar } = useCarrito()

const medios = {
  'origen-70': { tipo: 'foto', src: tabletaOrigen },
  'leche-45': { tipo: 'foto', src: tabletaLeche },
  'bombones-6': { tipo: 'foto', src: cajaDiagonal },
  'edicion-especial-9': { tipo: 'foto', src: cajaLibro },
}

const productos = computed(() => {
  const traducciones = tm('coleccion.productos')
  return catalogo.map((producto) => ({
    ...producto,
    ...(traducciones[producto.id] || {}),
  }))
})

const idDetalle = ref(null)
const zoomActivo = ref(false)
const ZOOM = 2.4
const LENTE_FRACCION = 1 / ZOOM
const lupaEstilo = reactive({ width: '0px', height: '0px', left: '0px', top: '0px' })
const zoomFondoEstilo = reactive({ backgroundImage: '', backgroundSize: '', backgroundPosition: '' })

const productoActivo = computed(() => productos.value.find((producto) => producto.id === idDetalle.value) || null)

const puedeZoom = typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

function abrirDetalle(id) {
  idDetalle.value = id
  zoomActivo.value = false
  const media = medios[id]
  if (media.tipo === 'foto') {
    zoomFondoEstilo.backgroundImage = `url(${media.src})`
  }
}

function cerrarDetalle() {
  idDetalle.value = null
  zoomActivo.value = false
}

function alEntrarImagen() {
  if (puedeZoom) zoomActivo.value = true
}

function alSalirImagen() {
  zoomActivo.value = false
}

function alMoverEnImagen(evento) {
  if (!puedeZoom) return
  const rect = evento.currentTarget.getBoundingClientRect()
  const anchoLente = rect.width * LENTE_FRACCION
  const altoLente = rect.height * LENTE_FRACCION
  const x = Math.min(Math.max(evento.clientX - rect.left - anchoLente / 2, 0), rect.width - anchoLente)
  const y = Math.min(Math.max(evento.clientY - rect.top - altoLente / 2, 0), rect.height - altoLente)

  lupaEstilo.width = `${anchoLente}px`
  lupaEstilo.height = `${altoLente}px`
  lupaEstilo.left = `${x}px`
  lupaEstilo.top = `${y}px`

  zoomFondoEstilo.backgroundSize = `${rect.width * ZOOM}px ${rect.height * ZOOM}px`
  zoomFondoEstilo.backgroundPosition = `${-x * ZOOM}px ${-y * ZOOM}px`
}

function alTecla(evento) {
  if (evento.key === 'Escape') cerrarDetalle()
}

onMounted(() => window.addEventListener('keydown', alTecla))
onUnmounted(() => window.removeEventListener('keydown', alTecla))

watch(idDetalle, (valor) => {
  document.body.style.overflow = valor ? 'hidden' : ''
})
</script>

<template>
  <section id="coleccion" class="coleccion">
    <span class="orbe orbe--rojo orbe--vagar2 coleccion__orbe1" style="animation-delay: -22s" aria-hidden="true"></span>
    <span class="orbe orbe--oro orbe--vagar4 coleccion__orbe2" style="animation-delay: -9s" aria-hidden="true"></span>

    <div class="contenedor">
      <div class="coleccion__cabecera">
        <p v-reveal class="eyebrow">{{ t('coleccion.eyebrow') }}</p>
        <h2 v-reveal="{ tipo: 'mascara', delay: 80 }" class="coleccion__titulo">
          <span>{{ t('coleccion.titulo') }}</span>
        </h2>
        <p v-reveal="{ delay: 180 }" class="coleccion__cuerpo">
          {{ t('coleccion.cuerpo') }}
          <em>{{ t('coleccion.notaPrecios') }}</em>
        </p>
      </div>
    </div>

    <Swiper
      :modules="modulos"
      :slides-per-view="1.15"
      :space-between="24"
      :grab-cursor="true"
      :navigation="{ prevEl: '.coleccion__flecha--prev', nextEl: '.coleccion__flecha--next' }"
      :breakpoints="{
        640: { slidesPerView: 1.8 },
        980: { slidesPerView: 2.6 },
        1280: { slidesPerView: 3.3 },
      }"
      class="coleccion__swiper"
    >
      <SwiperSlide v-for="(producto, i) in productos" :key="producto.id">
        <article
          v-reveal="{ tipo: 'escala', delay: i * 120 }"
          class="tarjeta cristal cristal--claro"
          :class="{ 'tarjeta--destacada': producto.destacado }"
        >
          <span v-if="producto.destacado" class="tarjeta__insignia">{{ t('coleccion.insignia') }}</span>

          <div class="tarjeta__medio">
            <img v-if="medios[producto.id].tipo === 'foto'" :src="medios[producto.id].src" :alt="producto.nombre" />
            <IconoCornalinas v-else :tipo="medios[producto.id].valor" class="tarjeta__icono" />
          </div>

          <div class="tarjeta__cuerpo">
            <p class="tarjeta__formato">{{ producto.formato }}</p>
            <h3>{{ producto.nombre }}</h3>
            <p class="tarjeta__descripcion">{{ producto.descripcion }}</p>

            <button type="button" class="tarjeta__detalle" @click="abrirDetalle(producto.id)">
              {{ t('coleccion.masDetalles') }} →
            </button>

            <div class="tarjeta__pie">
              <span class="tarjeta__precio">{{ producto.precio.toFixed(2).replace('.', ',') }} €</span>

              <div class="contador">
                <button type="button" @click="decrementar(producto.id)" :disabled="!cantidades[producto.id]" :aria-label="t('coleccion.quitar')">−</button>
                <span>{{ cantidades[producto.id] || 0 }}</span>
                <button type="button" @click="incrementar(producto.id)" :aria-label="t('coleccion.anadir')">+</button>
              </div>
            </div>
          </div>
        </article>
      </SwiperSlide>
    </Swiper>

    <div class="coleccion__navegacion contenedor">
      <button class="coleccion__flecha coleccion__flecha--prev" :aria-label="t('coleccion.anterior')">←</button>
      <button class="coleccion__flecha coleccion__flecha--next" :aria-label="t('coleccion.siguiente')">→</button>
    </div>

    <Teleport to="body">
      <Transition name="detalle-transicion">
        <div
          v-if="productoActivo"
          class="detalle-fondo"
          role="dialog"
          aria-modal="true"
          :aria-label="productoActivo.nombre"
          @click.self="cerrarDetalle"
        >
          <div class="detalle-panel cristal cristal--claro">
            <button type="button" class="detalle-cerrar" @click="cerrarDetalle" :aria-label="t('coleccion.cerrar')">×</button>

            <div
              class="detalle-imagen"
              :class="{ 'detalle-imagen--activa': zoomActivo }"
              @mouseenter="alEntrarImagen"
              @mouseleave="alSalirImagen"
              @mousemove="alMoverEnImagen"
            >
              <img
                v-if="medios[productoActivo.id].tipo === 'foto'"
                :src="medios[productoActivo.id].src"
                :alt="productoActivo.nombre"
              />
              <IconoCornalinas v-else :tipo="medios[productoActivo.id].valor" class="tarjeta__icono" />
              <span v-if="puedeZoom && !zoomActivo" class="detalle-pista-zoom">{{ t('coleccion.pasarMouse') }}</span>
              <div v-if="zoomActivo" class="detalle-lupa" :style="lupaEstilo"></div>
            </div>

            <div class="detalle-columna">
              <div class="detalle-info" :class="{ 'detalle-info--oculta': zoomActivo }">
                <p class="eyebrow">{{ productoActivo.formato }}</p>
                <h3>{{ productoActivo.nombre }}</h3>
                <p class="detalle-descripcion">
                  <IconoCornalinas tipo="hoja" class="detalle-descripcion__icono" />
                  {{ productoActivo.descripcion }}
                </p>
                <div class="detalle-precio-fila">
                  <span class="detalle-precio-etiqueta">{{ t('coleccion.precio') }}</span>
                  <span class="tarjeta__precio">{{ productoActivo.precio.toFixed(2).replace('.', ',') }} €</span>
                </div>
              </div>

              <div v-if="zoomActivo" class="detalle-zoom" :style="zoomFondoEstilo"></div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>

<style scoped>
.coleccion {
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: var(--papel);
}

.coleccion__orbe1 {
  width: 340px;
  height: 340px;
  top: 10%;
  left: -8%;
}

.coleccion__orbe2 {
  width: 280px;
  height: 280px;
  bottom: -10%;
  right: 6%;
  animation-delay: -10s;
}

.coleccion__cabecera,
.coleccion__swiper,
.coleccion__navegacion {
  position: relative;
  z-index: 1;
}

.coleccion__cabecera {
  max-width: 36rem;
  margin-bottom: clamp(2rem, 4.5vw, 3rem);
}

.coleccion__titulo {
  margin-top: 0.7rem;
  font-size: clamp(1.7rem, 3.2vw, 2.5rem);
}

.coleccion__cuerpo {
  margin-top: 0.9rem;
  font-size: 0.98rem;
  color: var(--cacao-suave);
}

.coleccion__cuerpo em {
  font-style: italic;
  opacity: 0.8;
}

.coleccion__swiper {
  max-width: var(--ancho-max);
  margin-inline: auto;
  padding: 1rem clamp(1.5rem, 5vw, 4rem) 2.5rem;
}

.tarjeta {
  position: relative;
  border-radius: 14px;
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  /* .cristal aplica una sombra de reposo pensada para paneles fijos; en un
     carrusel se ve recortada por el overflow:hidden del propio Swiper, así
     que aquí no hay sombra hasta el hover. */
  box-shadow: none;
  transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.5s ease;
}

.tarjeta:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 32px -18px rgba(58, 31, 20, 0.35);
}

.tarjeta--destacada {
  border-color: var(--oro);
  box-shadow: 0 0 0 1px var(--oro);
}

.tarjeta__insignia {
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 1;
  background: var(--oro);
  color: var(--blanco);
  font-size: 0.66rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  padding: 0.4rem 0.7rem;
  border-radius: 999px;
}

.tarjeta__medio {
  aspect-ratio: 3 / 2;
  overflow: hidden;
  background: linear-gradient(160deg, var(--papel-sombra), var(--papel-alto));
  display: flex;
  align-items: center;
  justify-content: center;
}

.tarjeta__medio img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.tarjeta:hover .tarjeta__medio img {
  transform: scale(1.08);
}

.tarjeta__icono {
  width: 30%;
  height: 30%;
  color: var(--rojo);
  opacity: 0.85;
}

.tarjeta__cuerpo {
  padding: 1.2rem 1.25rem 1.35rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.tarjeta__formato {
  font-size: 0.66rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--oro);
}

.tarjeta__cuerpo h3 {
  margin-top: 0.35rem;
  font-size: 1.15rem;
  line-height: 1.2;
}

.tarjeta__descripcion {
  margin-top: 0.5rem;
  font-size: 0.85rem;
  color: var(--cacao-suave);
  flex: 1;
}

.tarjeta__detalle {
  align-self: flex-start;
  margin-top: 0.9rem;
  padding: 0;
  border: none;
  background: none;
  font-size: 0.72rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--rojo);
  opacity: 0.85;
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.tarjeta__detalle:hover {
  opacity: 1;
  transform: translateX(3px);
}

.tarjeta__pie {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.tarjeta__precio {
  font-family: var(--fuente-display);
  font-size: 1.25rem;
  color: var(--cacao);
}

.contador {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  border: 1px solid var(--cacao);
  border-radius: 999px;
  padding: 0.2rem 0.4rem;
}

.contador button {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--cacao);
  font-size: 0.95rem;
  line-height: 1;
  transition: background 0.3s ease, color 0.3s ease;
}

.contador button:hover:not(:disabled) {
  background: var(--rojo);
  color: var(--blanco);
}

.contador button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.contador span {
  min-width: 1.2rem;
  text-align: center;
  font-size: 0.95rem;
}

.coleccion__navegacion {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
}

.coleccion__flecha {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--cacao);
  background: transparent;
  color: var(--cacao);
  font-size: 1.1rem;
  transition: background 0.35s ease, color 0.35s ease;
}

.coleccion__flecha:hover {
  background: var(--rojo);
  border-color: var(--rojo);
  color: var(--blanco);
}

.detalle-fondo {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: clamp(1.2rem, 5vw, 3rem);
  background: rgba(20, 5, 5, 0.6);
  backdrop-filter: blur(6px);
}

.detalle-panel {
  position: relative;
  width: min(920px, 100%);
  max-height: 90vh;
  overflow-y: auto;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 0;
}

.detalle-cerrar {
  position: absolute;
  top: 0.9rem;
  right: 0.9rem;
  z-index: 1;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: rgba(20, 5, 5, 0.5);
  color: var(--blanco);
  font-size: 1.2rem;
  line-height: 1;
  transition: background 0.3s ease, transform 0.3s ease;
}

.detalle-cerrar:hover {
  background: var(--rojo);
  transform: scale(1.08);
}

.detalle-imagen {
  position: relative;
  overflow: hidden;
  aspect-ratio: 4 / 3;
  cursor: crosshair;
  background: linear-gradient(160deg, var(--papel-sombra), var(--papel-alto));
}

.detalle-imagen img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.detalle-pista-zoom {
  position: absolute;
  left: 50%;
  bottom: 1rem;
  transform: translateX(-50%);
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(20, 5, 5, 0.55);
  color: var(--crema);
  font-size: 0.68rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.detalle-imagen:hover .detalle-pista-zoom {
  opacity: 1;
}

.detalle-lupa {
  position: absolute;
  border: 2px solid var(--oro);
  background: rgba(255, 244, 224, 0.28);
  pointer-events: none;
}

.detalle-columna {
  position: relative;
}

.detalle-info {
  padding: clamp(1.6rem, 3.5vw, 2.6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  transition: opacity 0.2s ease;
}

.detalle-info--oculta {
  opacity: 0;
  pointer-events: none;
}

.detalle-info h3 {
  margin-top: 0.5rem;
  font-size: clamp(1.4rem, 2.4vw, 1.8rem);
}

.detalle-descripcion {
  margin-top: 1.3rem;
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-family: var(--fuente-display);
  font-style: italic;
  font-size: 1.08rem;
  line-height: 1.55;
  color: var(--cacao);
}

.detalle-descripcion__icono {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  margin-top: 0.3rem;
  color: var(--oro);
  opacity: 0.85;
}

.detalle-precio-fila {
  margin-top: 1.8rem;
  padding-top: 1.4rem;
  border-top: 1px solid var(--cristal-claro-borde);
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.detalle-precio-etiqueta {
  font-size: 0.68rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--oro);
}

.detalle-info .tarjeta__precio {
  font-size: 1.5rem;
}

.detalle-zoom {
  position: absolute;
  inset: 0;
  background-repeat: no-repeat;
  background-color: var(--papel-alto);
}

.detalle-transicion-enter-active,
.detalle-transicion-leave-active {
  transition: opacity 0.3s ease;
}

.detalle-transicion-enter-from,
.detalle-transicion-leave-to {
  opacity: 0;
}

.detalle-transicion-enter-active .detalle-panel,
.detalle-transicion-leave-active .detalle-panel {
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.detalle-transicion-enter-from .detalle-panel,
.detalle-transicion-leave-to .detalle-panel {
  transform: scale(0.94) translateY(16px);
}

@media (max-width: 720px) {
  .detalle-panel {
    grid-template-columns: 1fr;
  }

  .detalle-imagen {
    aspect-ratio: 4 / 3;
  }
}
</style>

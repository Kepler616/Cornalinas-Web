<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useCarrito } from '../composables/useCarrito'

const { seleccion, totalArticulos, totalProvisional, vaciarCarrito } = useCarrito()

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  entrega: 'recogida',
  mensaje: '',
})

const enviando = ref(false)
const enviado = ref(false)
const cancelado = ref(false)
const error = ref('')

function formatoPrecio(valor) {
  return `${valor.toFixed(2).replace('.', ',')} €`
}

async function alEnviar() {
  if (seleccion.value.length === 0 || enviando.value) return

  enviando.value = true
  error.value = ''

  const mensajeGenerico = 'No se pudo iniciar el pago. Intenta de nuevo en unos minutos.'

  try {
    const respuesta = await fetch('/api/crear-sesion-pago', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        seleccion: seleccion.value.map((p) => ({ id: p.id, cantidad: p.cantidad })),
        cliente: {
          nombre: form.nombre,
          email: form.email,
          telefono: form.telefono,
          entrega: form.entrega,
          mensaje: form.mensaje,
        },
      }),
    })

    const datos = await respuesta.json().catch(() => null)

    if (!respuesta.ok || !datos?.url) {
      throw new Error(datos?.error || mensajeGenerico)
    }

    window.location.href = datos.url
  } catch (e) {
    error.value = e.message || mensajeGenerico
    enviando.value = false
  }
}

function nuevaSolicitud() {
  enviado.value = false
  cancelado.value = false
  vaciarCarrito()
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.mensaje = ''
}

function reintentar() {
  cancelado.value = false
}

onMounted(() => {
  const parametros = new URLSearchParams(window.location.search)
  const estado = parametros.get('pedido')

  if (estado === 'exito') {
    enviado.value = true
    vaciarCarrito()
  } else if (estado === 'cancelado') {
    cancelado.value = true
  }

  if (estado) {
    const url = new URL(window.location.href)
    url.searchParams.delete('pedido')
    url.searchParams.delete('session_id')
    window.history.replaceState({}, '', url)
  }
})
</script>

<template>
  <section id="pedido" class="pedido">
    <span class="orbe orbe--rubi orbe--vagar3 pedido__orbe1" style="animation-delay: -13s" aria-hidden="true"></span>
    <span class="orbe orbe--oro orbe--vagar1 pedido__orbe2" style="animation-delay: -8s" aria-hidden="true"></span>

    <div class="contenedor pedido__grid">
      <div class="pedido__intro">
        <p v-reveal="{ tipo: 'izquierda' }" class="eyebrow eyebrow--claro">06 · Tu selección</p>
        <h2 v-reveal="{ tipo: 'mascara', delay: 80 }"><span>Hagamos este momento tuyo.</span></h2>
        <p v-reveal="{ tipo: 'izquierda', delay: 160 }" class="pedido__cuerpo">
          Completa tus datos, paga de forma segura con tarjeta y nosotros
          preparamos tu pedido con el mismo cuidado con el que elaboramos
          nuestro chocolate.
        </p>

        <ul class="resumen">
          <li v-for="(p, i) in seleccion" :key="p.id" v-reveal="{ tipo: 'izquierda', delay: 220 + i * 90 }">
            <span>{{ p.cantidad }} × {{ p.nombre }}</span>
            <strong>{{ formatoPrecio(p.precio * p.cantidad) }}</strong>
          </li>
          <li v-if="seleccion.length === 0" class="resumen__vacio">
            Aún no has añadido productos. <a href="#coleccion">Ver la colección →</a>
          </li>
        </ul>

        <div v-if="seleccion.length" class="resumen__total">
          <span>Total provisional ({{ totalArticulos }} artículos)</span>
          <strong>{{ formatoPrecio(totalProvisional) }}</strong>
        </div>
      </div>

      <div v-reveal="{ tipo: 'derecha', delay: 220 }" class="pedido__panel cristal cristal--claro">
        <transition name="fundido" mode="out-in">
          <div v-if="enviado" key="gracias" class="confirmacion">
            <h3>Gracias por tu compra.</h3>
            <p>
              Tu pago se procesó correctamente y Stripe te envió un recibo por
              correo. Te escribiremos personalmente para coordinar la entrega.
            </p>
            <button type="button" class="boton boton--solido" @click="nuevaSolicitud">Hacer otro pedido</button>
          </div>

          <div v-else-if="cancelado" key="cancelado" class="confirmacion">
            <h3>Pago cancelado.</h3>
            <p>
              No te preocupes, tu selección sigue guardada y no se realizó
              ningún cobro. Puedes intentarlo de nuevo cuando quieras.
            </p>
            <button type="button" class="boton boton--solido" @click="reintentar">Volver a intentar</button>
          </div>

          <form v-else key="formulario" class="formulario" @submit.prevent="alEnviar">
            <div class="campo">
              <label for="nombre">Nombre completo</label>
              <input id="nombre" v-model="form.nombre" type="text" required placeholder="Tu nombre" />
            </div>

            <div class="campo-grupo">
              <div class="campo">
                <label for="email">Correo electrónico</label>
                <input id="email" v-model="form.email" type="email" required placeholder="tu@correo.com" />
              </div>
              <div class="campo">
                <label for="telefono">Teléfono</label>
                <input id="telefono" v-model="form.telefono" type="tel" required placeholder="+49 ..." />
              </div>
            </div>

            <fieldset class="campo">
              <legend>Método de entrega</legend>
              <div class="opciones">
                <label class="opcion">
                  <input v-model="form.entrega" type="radio" value="recogida" />
                  Recogida en tienda
                </label>
                <label class="opcion">
                  <input v-model="form.entrega" type="radio" value="envio" />
                  Envío a domicilio
                </label>
              </div>
            </fieldset>

            <p v-if="form.entrega === 'envio'" class="nota-envio">
              Te pediremos la dirección de envío en el siguiente paso, durante el pago seguro.
            </p>

            <div class="campo">
              <label for="mensaje">Mensaje (opcional)</label>
              <textarea id="mensaje" v-model="form.mensaje" rows="3" placeholder="Alguna dedicatoria o detalle para tu pedido"></textarea>
            </div>

            <p v-if="error" class="nota-error">{{ error }}</p>

            <p class="nota-confianza">
              El pago se procesa de forma segura con Stripe (tarjeta). Nunca
              vemos ni guardamos los datos de tu tarjeta.
            </p>

            <button type="submit" class="boton boton--solido" :disabled="seleccion.length === 0 || enviando">
              {{ enviando ? 'Redirigiendo al pago…' : 'Pagar de forma segura →' }}
            </button>
          </form>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pedido {
  position: relative;
  overflow: hidden;
  padding-block: var(--espacio-seccion);
  background: var(--burdeos-noche);
  color: var(--crema-suave);
}

.pedido__orbe1 {
  width: 380px;
  height: 380px;
  top: -10%;
  right: -6%;
}

.pedido__orbe2 {
  width: 260px;
  height: 260px;
  bottom: 4%;
  left: -4%;
  animation-delay: -9s;
}

.pedido__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: start;
}

.pedido__intro h2 {
  margin-top: 1rem;
  font-size: clamp(2rem, 4.4vw, 3.2rem);
  color: var(--blanco);
  max-width: 16ch;
}

.pedido__cuerpo {
  margin-top: 1.2rem;
  font-size: 1.05rem;
  opacity: 0.82;
  max-width: 32rem;
}

.resumen {
  list-style: none;
  margin: 2.4rem 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  border-top: 1px solid rgba(252, 213, 191, 0.18);
  padding-top: 1.4rem;
}

.resumen li {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  font-size: 0.95rem;
}

.resumen__vacio {
  opacity: 0.7;
  font-style: italic;
}

.resumen__vacio a {
  color: var(--oro-brillo);
  text-decoration: underline;
}

.resumen__total {
  display: flex;
  justify-content: space-between;
  margin-top: 1.4rem;
  padding-top: 1.4rem;
  border-top: 1px solid rgba(252, 213, 191, 0.18);
  font-family: var(--fuente-display);
  font-size: 1.3rem;
  color: var(--blanco);
}

.pedido__panel {
  /* Este panel flota sobre el fondo muy oscuro de la sección: se sube la
     opacidad del cristal claro compartido para que siga leyéndose como una
     tarjeta clara y con buen contraste en vez de mezclarse con el fondo. */
  background: rgba(230, 202, 156, 0.92);
  border-color: rgba(255, 244, 224, 0.55);
  color: var(--cacao);
  border-radius: 16px;
  padding: clamp(1.8rem, 4vw, 2.6rem);
}

.formulario {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.campo-grupo {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.4rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border: none;
  padding: 0;
  margin: 0;
}

label,
legend {
  font-size: 0.72rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--cacao-suave);
  padding: 0;
}

input[type='text'],
input[type='email'],
input[type='tel'],
textarea {
  border: 1px solid rgba(42, 22, 12, 0.28);
  background: rgba(255, 248, 235, 0.5);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  padding: 0.8rem 1rem;
  font-family: var(--fuente-cuerpo);
  font-size: 0.95rem;
  color: var(--cacao);
  resize: vertical;
  transition: background 0.3s ease, border-color 0.3s ease;
}

input[type='text']:focus,
input[type='email']:focus,
input[type='tel']:focus,
textarea:focus {
  background: rgba(255, 248, 235, 0.82);
}

input:focus,
textarea:focus {
  outline: 2px solid var(--rojo);
  outline-offset: 1px;
}

.opciones {
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  margin-top: 0.3rem;
}

.opcion {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.92rem;
  text-transform: none;
  letter-spacing: normal;
  color: var(--cacao);
}

.opcion input {
  accent-color: var(--rojo);
}

.nota-confianza {
  font-size: 0.82rem;
  color: var(--cacao-suave);
  opacity: 0.85;
  border-top: 1px dotted var(--oro);
  padding-top: 1rem;
}

.nota-envio {
  margin-top: -0.6rem;
  font-size: 0.85rem;
  font-style: italic;
  color: var(--cacao-suave);
  opacity: 0.85;
}

.nota-error {
  font-size: 0.88rem;
  color: var(--rojo);
  background: rgba(159, 30, 33, 0.1);
  border: 1px solid rgba(159, 30, 33, 0.3);
  border-radius: 6px;
  padding: 0.7rem 0.9rem;
}

.formulario .boton {
  align-self: flex-start;
}

.confirmacion h3 {
  font-size: 1.8rem;
}

.confirmacion p {
  margin-top: 1rem;
  color: var(--cacao-suave);
  max-width: 32rem;
}

.confirmacion .boton {
  margin-top: 1.6rem;
}

.fundido-enter-active,
.fundido-leave-active {
  transition: opacity 0.35s ease;
}
.fundido-enter-from,
.fundido-leave-to {
  opacity: 0;
}

@media (max-width: 900px) {
  .pedido__grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 560px) {
  .campo-grupo {
    grid-template-columns: 1fr;
  }
}
</style>

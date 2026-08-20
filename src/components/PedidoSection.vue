<script setup>
import { reactive, ref } from 'vue'
import { useCarrito } from '../composables/useCarrito'

const { seleccion, totalArticulos, totalProvisional, vaciarCarrito } = useCarrito()

const form = reactive({
  nombre: '',
  email: '',
  telefono: '',
  entrega: 'recogida',
  direccion: '',
  pago: 'transferencia',
  mensaje: '',
})

const enviado = ref(false)

function formatoPrecio(valor) {
  return `${valor.toFixed(2).replace('.', ',')} €`
}

function construirCuerpoCorreo() {
  const lineas = seleccion.value.map(
    (p) => `— ${p.nombre} (${p.formato}) × ${p.cantidad} = ${formatoPrecio(p.precio * p.cantidad)}`
  )
  return [
    'Nueva solicitud de pedido Cornalinas',
    '',
    'Selección:',
    ...lineas,
    '',
    `Total provisional: ${formatoPrecio(totalProvisional.value)}`,
    '',
    `Nombre: ${form.nombre}`,
    `Email: ${form.email}`,
    `Teléfono: ${form.telefono}`,
    `Entrega: ${form.entrega === 'recogida' ? 'Recogida en tienda' : 'Envío a domicilio'}`,
    form.entrega === 'envio' ? `Dirección: ${form.direccion}` : null,
    `Pago: ${form.pago === 'transferencia' ? 'Transferencia bancaria' : 'Efectivo contra entrega'}`,
    form.mensaje ? `Mensaje: ${form.mensaje}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

function alEnviar() {
  if (seleccion.value.length === 0) return

  const asunto = encodeURIComponent('Nueva solicitud de pedido — Cornalinas')
  const cuerpo = encodeURIComponent(construirCuerpoCorreo())
  window.location.href = `mailto:hola@cornalinas.com?subject=${asunto}&body=${cuerpo}`

  enviado.value = true
}

function nuevaSolicitud() {
  enviado.value = false
  vaciarCarrito()
  form.nombre = ''
  form.email = ''
  form.telefono = ''
  form.direccion = ''
  form.mensaje = ''
}
</script>

<template>
  <section id="pedido" class="pedido">
    <div class="contenedor pedido__grid">
      <div class="pedido__intro">
        <p v-reveal class="eyebrow eyebrow--claro">06 · Tu selección</p>
        <h2 v-reveal="{ delay: 100 }">Hagamos este momento tuyo.</h2>
        <p v-reveal="{ delay: 180 }" class="pedido__cuerpo">
          Completa tus datos y prepararemos la confirmación de tu pedido
          personalmente, con el mismo cuidado con el que elaboramos nuestro
          chocolate.
        </p>

        <ul class="resumen">
          <li v-for="p in seleccion" :key="p.id">
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

      <div v-reveal="{ delay: 220 }" class="pedido__panel">
        <transition name="fundido" mode="out-in">
          <div v-if="enviado" key="gracias" class="confirmacion">
            <h3>Gracias por tu confianza.</h3>
            <p>
              Hemos preparado tu solicitud en tu cliente de correo. En cuanto
              la recibamos, te contactaremos personalmente para confirmar
              disponibilidad, envío y el total final.
            </p>
            <button type="button" class="boton boton--solido" @click="nuevaSolicitud">Hacer otra solicitud</button>
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

            <div v-if="form.entrega === 'envio'" class="campo">
              <label for="direccion">Dirección de envío</label>
              <input id="direccion" v-model="form.direccion" type="text" required placeholder="Calle, número, ciudad, código postal" />
            </div>

            <fieldset class="campo">
              <legend>Método de pago</legend>
              <div class="opciones">
                <label class="opcion">
                  <input v-model="form.pago" type="radio" value="transferencia" />
                  Transferencia bancaria
                </label>
                <label class="opcion">
                  <input v-model="form.pago" type="radio" value="efectivo" />
                  Efectivo contra entrega
                </label>
              </div>
            </fieldset>

            <div class="campo">
              <label for="mensaje">Mensaje (opcional)</label>
              <textarea id="mensaje" v-model="form.mensaje" rows="3" placeholder="Alguna dedicatoria o detalle para tu pedido"></textarea>
            </div>

            <p class="nota-confianza">
              No se realizará ningún cobro automático en esta página. Te
              contactaremos para confirmar disponibilidad, detalles de envío y
              el total final antes del pago.
            </p>

            <button type="submit" class="boton boton--solido" :disabled="seleccion.length === 0">
              Solicitar mi pedido con afecto →
            </button>
          </form>
        </transition>
      </div>
    </div>
  </section>
</template>

<style scoped>
.pedido {
  padding-block: var(--espacio-seccion);
  background: var(--burdeos-noche);
  color: var(--crema-suave);
}

.pedido__grid {
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
  background: var(--papel-alto);
  color: var(--cacao);
  border-radius: 12px;
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
  border: 1px solid var(--papel-sombra);
  background: var(--papel);
  border-radius: 6px;
  padding: 0.8rem 1rem;
  font-family: var(--fuente-cuerpo);
  font-size: 0.95rem;
  color: var(--cacao);
  resize: vertical;
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

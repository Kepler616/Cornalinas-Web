import { reactive, computed } from 'vue'
import { productos } from '../../shared/catalogo.js'

export { productos }

const cantidades = reactive(Object.fromEntries(productos.map((p) => [p.id, 0])))

function fijarCantidad(id, valor) {
  cantidades[id] = Math.max(0, Math.min(20, valor))
}

function incrementar(id) {
  fijarCantidad(id, (cantidades[id] || 0) + 1)
}

function decrementar(id) {
  fijarCantidad(id, (cantidades[id] || 0) - 1)
}

const seleccion = computed(() =>
  productos
    .map((p) => ({ ...p, cantidad: cantidades[p.id] || 0 }))
    .filter((p) => p.cantidad > 0)
)

const totalArticulos = computed(() => seleccion.value.reduce((acc, p) => acc + p.cantidad, 0))
const totalProvisional = computed(() => seleccion.value.reduce((acc, p) => acc + p.cantidad * p.precio, 0))

function vaciarCarrito() {
  productos.forEach((p) => (cantidades[p.id] = 0))
}

export function useCarrito() {
  return {
    productos,
    cantidades,
    incrementar,
    decrementar,
    fijarCantidad,
    seleccion,
    totalArticulos,
    totalProvisional,
    vaciarCarrito,
  }
}

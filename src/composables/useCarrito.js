import { reactive, computed } from 'vue'

export const productos = [
  {
    id: 'origen-70',
    nombre: 'Tableta Origen (70%)',
    formato: '70 g',
    descripcion: '70 g de puro carácter venezolano. Intensidad en su máxima expresión.',
    precio: 6.5,
    destacado: false,
  },
  {
    id: 'leche-45',
    nombre: 'Tableta con Leche (45%)',
    formato: '70 g',
    descripcion: '70 g de nostalgia. Cremosa, suave y perfectamente equilibrada.',
    precio: 6.0,
    destacado: false,
  },
  {
    id: 'bombones-6',
    nombre: 'Caja de Bombones',
    formato: '6 piezas',
    descripcion: 'Una selección artesanal curada a mano. El detalle perfecto para sorprender.',
    precio: 14.0,
    destacado: false,
  },
  {
    id: 'edicion-especial-9',
    nombre: 'Edición Especial — Caja Signature',
    formato: '9 piezas',
    descripcion: 'Nuestra propuesta insignia: tres texturas de cacao venezolano, una sola historia.',
    precio: 19.5,
    destacado: true,
  },
  {
    id: 'mini-pack-4',
    nombre: 'Mini Pack',
    formato: '4 tabletas · 25 g cada una',
    descripcion: 'Cuatro tabletas pequeñas para probar, compartir o llevar contigo a donde vayas.',
    precio: 8.5,
    destacado: false,
  },
  {
    id: 'limon-coco',
    nombre: 'Limón & Coco',
    formato: 'Edición especial · Azúcar de coco',
    descripcion: 'Chocolate oscuro con un toque cítrico de limón, relleno de coco y endulzado con azúcar de coco.',
    precio: 7.5,
    destacado: true,
  },
]

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

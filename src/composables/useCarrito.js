import { reactive, computed } from 'vue'

export const productos = [
  {
    id: 'origen-70',
    nombre: 'Tableta Origen (70%)',
    formato: '70 g',
    descripcion: '70 g de cacao venezolano en su expresión más pura: intenso, con notas frutales y un final profundamente achocolatado que se queda contigo.',
    precio: 6.5,
    destacado: false,
  },
  {
    id: 'leche-45',
    nombre: 'Tableta con Leche (45%)',
    formato: '70 g',
    descripcion: '70 g de ternura envuelta en chocolate: cremosa, suave y con ese dulzor justo que sabe a casa.',
    precio: 6.0,
    destacado: false,
  },
  {
    id: 'bombones-6',
    nombre: 'Caja de Bombones',
    formato: '6 piezas',
    descripcion: 'Seis bombones curados a mano, cada uno una pequeña historia de sabor. El detalle perfecto para sorprender a alguien.',
    precio: 14.0,
    destacado: false,
  },
  {
    id: 'edicion-especial-9',
    nombre: 'Edición Especial — Caja Signature',
    formato: '9 piezas',
    descripcion: 'Nuestra pieza más ambiciosa: nueve bombones que recorren tres texturas de cacao venezolano en una sola caja, para regalar o para darte el gusto.',
    precio: 19.5,
    destacado: true,
  },
  {
    id: 'mini-pack-4',
    nombre: 'Mini Pack',
    formato: '4 tabletas · 25 g cada una',
    descripcion: 'Cuatro tabletas pequeñas, perfectas para probar, compartir o llevar contigo a donde vayas: el sabor Cornalinas en formato de bolsillo.',
    precio: 8.5,
    destacado: false,
  },
  {
    id: 'limon-coco',
    nombre: 'Limón & Coco',
    formato: 'Edición especial · Azúcar de coco',
    descripcion: 'Chocolate oscuro con un toque cítrico de limón y un corazón de coco, endulzado con azúcar de coco para un dulzor más suave y natural.',
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

// Catálogo de productos, compartido entre el frontend (carrito) y la función
// serverless que crea la sesión de pago. El backend es la única fuente de
// verdad para el precio: nunca se confía en un precio enviado por el cliente.

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
]

export function buscarProducto(id) {
  return productos.find((p) => p.id === id)
}

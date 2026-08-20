import Stripe from 'stripe'
import { buscarProducto } from '../shared/catalogo.js'

const PAISES_ENVIO = ['DE', 'AT', 'CH', 'FR', 'NL', 'BE', 'ES', 'IT', 'LU']
const CANTIDAD_MAXIMA = 20

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Método no permitido.' })
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY
  if (!stripeKey) {
    console.error('Falta STRIPE_SECRET_KEY en las variables de entorno.')
    return res.status(500).json({ error: 'El pago en línea no está configurado todavía.' })
  }

  const { seleccion, cliente } = req.body || {}

  if (!Array.isArray(seleccion) || seleccion.length === 0) {
    return res.status(400).json({ error: 'No hay productos en la selección.' })
  }
  if (!cliente?.nombre || !cliente?.email || !cliente?.telefono) {
    return res.status(400).json({ error: 'Faltan datos de contacto.' })
  }
  if (cliente.entrega !== 'recogida' && cliente.entrega !== 'envio') {
    return res.status(400).json({ error: 'Método de entrega inválido.' })
  }

  // El precio y el nombre SIEMPRE se toman del catálogo del servidor; el
  // cliente solo puede indicar qué producto (id) y cuántas unidades.
  let lineItems
  try {
    lineItems = seleccion.map(({ id, cantidad }) => {
      const producto = buscarProducto(id)
      const unidades = Number(cantidad)

      if (!producto) throw new Error(`Producto desconocido: ${id}`)
      if (!Number.isInteger(unidades) || unidades < 1 || unidades > CANTIDAD_MAXIMA) {
        throw new Error(`Cantidad inválida para ${id}`)
      }

      return {
        quantity: unidades,
        price_data: {
          currency: 'eur',
          unit_amount: Math.round(producto.precio * 100),
          product_data: {
            name: producto.nombre,
            description: `${producto.formato} · ${producto.descripcion}`,
          },
        },
      }
    })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }

  const origen = process.env.PUBLIC_SITE_URL || req.headers.origin || 'http://localhost:5173'

  try {
    const stripe = new Stripe(stripeKey)

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: lineItems,
      customer_email: cliente.email,
      phone_number_collection: { enabled: true },
      ...(cliente.entrega === 'envio'
        ? { shipping_address_collection: { allowed_countries: PAISES_ENVIO } }
        : {}),
      metadata: {
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        entrega: cliente.entrega,
        mensaje: cliente.mensaje || '',
      },
      success_url: `${origen}/?pedido=exito&session_id={CHECKOUT_SESSION_ID}#pedido`,
      cancel_url: `${origen}/?pedido=cancelado#pedido`,
    })

    return res.status(200).json({ url: session.url })
  } catch (error) {
    console.error('Error creando la sesión de Stripe:', error)
    return res.status(500).json({ error: 'No se pudo iniciar el pago. Intenta de nuevo.' })
  }
}

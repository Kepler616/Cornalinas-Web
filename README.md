# Cornalinas

Sitio de una sola página para Cornalinas — chocolate venezolano artesanal
hecho en Berlín. Construido con Vue 3, Vite y Swiper: hero cinemático,
historia de marca, proceso Bean to Bar, catálogo con carrito reactivo y
un formulario de solicitud de pedido (sin cobro en línea).

No hay backend activo: el catálogo y el carrito viven en el estado del
cliente (`src/composables/useCarrito.js`), y el formulario de pedido arma
un correo (`mailto:`) con el resumen de la selección. Cornalinas confirma
disponibilidad y coordina el pago manualmente (transferencia o efectivo).

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)

## Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) para ver el sitio.

## Producción

```bash
npm run build
npm run preview
```

## Estructura

- `src/components/` — secciones de la página (Hero, Historia, Proceso, Materia Prima, Colección, Pedido, Regalo, Footer) y componentes compartidos (header, iconos, divisores).
- `src/composables/` — `useCarrito.js` (estado del carrito) y `useParallax.js`.
- `src/assets/` — logotipos, paleta de marca y fotografía de producto/proceso.

## Pago en línea — en pausa

Existe una integración de checkout instantáneo con Stripe (Checkout
Sessions vía una función serverless) ya construida pero **desactivada**,
a la espera de que se registre la cuenta/marca en Stripe:

- `api/crear-sesion-pago.js` — función serverless (Vercel) que valida el
  carrito contra el catálogo del servidor y crea la sesión de pago.
- `shared/catalogo.js` — catálogo de productos/precios, pensado para ser
  la fuente de verdad compartida entre el frontend y esa función.
- `.env.example` — variables de entorno que necesitaría (`STRIPE_SECRET_KEY`, `PUBLIC_SITE_URL`).

Estos archivos no están conectados al formulario actual (que sigue usando
`mailto:`), así que no requieren ninguna cuenta ni configuración para que
el sitio funcione hoy. Cuando se retome, hay dos caminos:

1. **Enlaces de pago manuales** (sin cambios de código): una vez exista
   una cuenta de Stripe, se genera un "Payment Link" por pedido desde el
   dashboard de Stripe y se envía por correo tras confirmar el pedido —
   mismo flujo de hoy, solo cambia transferencia/efectivo por un link.
2. **Checkout automático** (lo ya construido): reconectar
   `PedidoSection.vue` a `/api/crear-sesion-pago` para que el pago ocurra
   al momento, sin paso manual — ver el historial de git (commit "Add real
   online checkout via Stripe") para el diff exacto a reaplicar.

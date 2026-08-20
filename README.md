# Cornalinas

Sitio de una sola página para Cornalinas — chocolate venezolano artesanal
hecho en Berlín. Construido con Vue 3, Vite y Swiper: hero cinemático,
historia de marca, proceso Bean to Bar, catálogo con carrito reactivo y
un checkout con pago en línea real vía Stripe.

El catálogo y el carrito viven en el estado del cliente
(`src/composables/useCarrito.js`), pero el **precio autoritativo vive en
el servidor** (`shared/catalogo.js`, usado también por la función
serverless): el cliente nunca puede alterar un precio.

## Requisitos

- [Node.js](https://nodejs.org/) 18 o superior
- npm (incluido con Node.js)
- Una cuenta de [Stripe](https://dashboard.stripe.com/register) (gratis, sin costo hasta que proceses pagos)
- Una cuenta de [Vercel](https://vercel.com/signup) para desplegar (gratis para este uso)

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) para ver el sitio.

**Nota:** con `npm run dev` (Vite puro) el formulario de pedido mostrará un
error al pagar, porque la función `/api/crear-sesion-pago` solo corre bajo
Vercel. Para probar el flujo de pago completo en local, instala el
[Vercel CLI](https://vercel.com/docs/cli) y usa `vercel dev` en su lugar
(pide vincular el proyecto a tu cuenta de Vercel la primera vez).

## Configurar Stripe

1. Crea una cuenta en [dashboard.stripe.com](https://dashboard.stripe.com/register).
2. En el dashboard, activa el **modo de prueba** (interruptor "Test mode") y ve a **Developers → API keys**.
3. Copia la **Secret key** de prueba (empieza con `sk_test_...`).
4. Cópiala como variable de entorno — nunca la escribas en el código ni la subas a git.

## Desplegar en Vercel

1. En [vercel.com](https://vercel.com), "Add New Project" → importa el repositorio `Cornalinas-Web` de GitHub.
2. Vercel detecta Vite automáticamente; no hace falta configurar nada más.
3. Antes de desplegar (o después, en Project Settings → Environment Variables), agrega:
   - `STRIPE_SECRET_KEY` = tu clave secreta de prueba (`sk_test_...`)
   - `PUBLIC_SITE_URL` = la URL que te asigne Vercel (ej. `https://cornalinas-web.vercel.app`)
4. Despliega. El formulario de "Tu selección" ya debería redirigir a una página de pago real de Stripe.
5. Para probar un pago sin usar una tarjeta real, usa una [tarjeta de prueba de Stripe](https://docs.stripe.com/testing) como `4242 4242 4242 4242`, cualquier fecha futura y cualquier CVC.
6. Cada pago de prueba aparece en el dashboard de Stripe (modo prueba) con el nombre, correo, teléfono y notas del cliente.

### Pasar a producción (cobros reales)

Cuando Stripe termine de verificar los datos fiscales/bancarios del negocio
(esto lo completas tú en el dashboard de Stripe, en "Activar cuenta"),
reemplaza `STRIPE_SECRET_KEY` en Vercel por la clave que empieza con
`sk_live_...` y vuelve a desplegar.

### Pendiente para una v2 (no incluido todavía)

- **Confirmación por correo automática**: hoy, después de pagar, el cliente
  ve la confirmación en pantalla y recibe el recibo que envía Stripe
  automáticamente. Cornalinas ve cada pedido en el dashboard de Stripe. Un
  webhook (`checkout.session.completed`) + un servicio de correo transaccional
  (ej. Resend) permitiría además notificar a Cornalinas por correo/Slack en
  cada venta.

## Producción (build local)

```bash
npm run build
npm run preview
```

## Estructura

- `src/components/` — secciones de la página (Hero, Historia, Proceso, Materia Prima, Colección, Pedido, Regalo, Footer) y componentes compartidos (header, iconos, divisores).
- `src/composables/` — `useCarrito.js` (estado del carrito) y `useParallax.js`.
- `src/assets/` — logotipos, paleta de marca y fotografía de producto/proceso.
- `shared/catalogo.js` — catálogo de productos y precios; fuente de verdad compartida entre el frontend y el backend.
- `api/crear-sesion-pago.js` — función serverless (Vercel) que valida el carrito contra el catálogo y crea la sesión de pago en Stripe.

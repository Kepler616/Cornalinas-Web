# Cornalinas

Sitio de una sola página para Cornalinas — chocolate venezolano artesanal
hecho en Berlín. Construido con Vue 3, Vite y Swiper: hero cinemático,
historia de marca, proceso Bean to Bar, catálogo con carrito reactivo y
un formulario de solicitud de pedido (sin cobro en línea).

No hay backend: el catálogo y el carrito viven en el estado del cliente
(`src/composables/useCarrito.js`), y el formulario de pedido arma un
correo (`mailto:`) con el resumen de la selección.

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

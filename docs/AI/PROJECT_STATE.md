# PROJECT_STATE — estado vigente (2026-07-13)

## Stack
- Next.js 15.5 App Router · React 19 · TypeScript · Tailwind 3.4 · Zustand 5
- Fuentes: Bebas Neue (display) + Barlow Condensed (cuerpo), vía next/font
- Hosting: Vercel · prod: https://dushi-web-seven.vercel.app
- Sin base de datos, sin auth, sin pagos. Única API: `/api/geo` (headers Vercel).

## Arquitectura
- One-page: `src/app/page.tsx` compone KanjiField, Header, Hero, MenuSection,
  IkigaiSection, DeliverySection, LocationsSection, Footer, LocationPicker, CartDrawer.
- Estado: useCart (carrito con extras, persist v2), useLocation (ciudad/sucursal, persist).
- Datos generados: `src/data/menus.ts` desde `content/*.md` con `scripts/parse-menus.mjs`
  (parsea bullets/tablas, explota variantes, vincula fotos por nombre, inyecta Extras).

## Funcionalidades terminadas
- Gate ciudad→sucursal con sugerencia por IP (VER/PUE/OAX/TAB→Veracruz; NLE/COA/TAM→MTY).
- 4 sucursales con menú propio: Plaza Américas, Martí, Cuauhtémoc (Veracruz);
  Plaza Annya (Monterrey, lunes cerrado).
- Carrito: cantidades, extras, persistencia, se vacía al cambiar sucursal.
- Pedido WhatsApp con desglose, total y campos Nombre/Dirección/Pago.
- Pedido programado (fecha/hora) obligatorio fuera de horario, opcional dentro.
- Búsqueda: sin acentos, sin mayúsculas y sin espacios ("dushibox"→"Dushi Box").
- Extra de rollo: solo Empanizado +$20, colapsado, con leyenda de preparación.
- Sección Extras (12 ítems) en los 4 menús.
- Fotos reales por platillo (~95%): `public/platillos/` (250 jpg optimizados).
- Rediseño identidad menú físico: verde bosque + mostaza + tipografía condensada,
  textura de ruido, fondo animado 生き甲斐 con parallax (reduced-motion respetado).

## Funcionalidades incompletas / pendientes
- Links reales de Uber Eats / Rappi / DiDi por sucursal (placeholders "#").
- Redes sociales y teléfono del footer (placeholders).
- Facturación y Bolsa de trabajo (links muertos "#").
- Favicon con la "D" del isotipo (no configurado).
- ~9-17 platillos por menú sin foto oficial (usan fotos del PDF anterior).
- Dominio dushi.mx no conectado a Vercel.
- Club Dushi (lealtad): no existe.

## Integraciones activas
- WhatsApp: wa.me con mensaje prellenado. VER 522299275377 · MTY 528113063020.
- Vercel: deploy manual `npx vercel --prod --yes` (solo con autorización).
- Geo por IP: headers `x-vercel-ip-country-region` (solo funciona en Vercel).

## Problemas conocidos
- NO hay repositorio git (pendiente `git init` + primer commit).
- `npm run build` local pisa `.next` del dev server activo → reiniciar dev tras build.
- wa.link antiguos no aceptan texto prellenado; por eso se usa wa.me + phone.
- IDs de sucursal cambiaron una vez; localStorage viejo cae al fallback sin gate.

## Próximo paso general
- `git init` + primer commit; conectar dushi.mx; completar links de delivery.

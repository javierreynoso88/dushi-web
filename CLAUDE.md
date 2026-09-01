# Dushi Web

Sitio one-page de pedidos a domicilio de Dushi (comida japonesa, Veracruz y Monterrey).
El cliente elige ciudad → sucursal, arma carrito desde el menú de esa sucursal y el
pedido se envía por WhatsApp. Sin pagos en línea, sin backend propio (solo /api/geo).

## Stack
- Next.js 15 (App Router, `src/app/`) · React 19 · TypeScript
- Tailwind CSS 3.4 (tokens en `tailwind.config.ts`) · Zustand 5 (persist/localStorage)
- Deploy: Vercel · Producción: https://dushi-web-seven.vercel.app

## Comandos
- `npm run dev` — desarrollo (puerto 3000/3010)
- `npm run build` — build de producción (ejecutar antes de desplegar)
- `node scripts/parse-menus.mjs` — regenera `src/data/menus.ts` desde `content/*.md`
- `npx vercel --prod --yes` — publicar (solo con autorización expresa del dueño)
- No hay suite de pruebas; la verificación es build + revisión en navegador.

## Arquitectura
- `src/app/page.tsx` compone todas las secciones; `layout.tsx` carga fuentes.
- Estado global: `src/store/useCart.ts` (carrito) y `useLocation.ts` (ciudad/sucursal).
- Datos: `src/data/` — `menus.ts` es GENERADO (no editar a mano), `locations.ts`
  (sucursales/horarios/WhatsApp), `extras.ts`, `menu.ts` (tipos).
- UI: `src/components/` (una sección por archivo). Horarios: `src/lib/hours.ts`.
- Fotos de platillos: `public/platillos/` (vinculadas por nombre en el parser).

## Reglas permanentes
1. Los precios y menús salen de `content/*.md` → parser. Nunca editar `menus.ts` directo.
2. Pedidos WhatsApp: Veracruz 522299275377 · Monterrey 528113063020. No cambiar sin aviso.
3. Identidad visual: verde bosque + amarillo mostaza (tokens Tailwind). No inventar
   logos ni usar fotos de stock; las fotos reales están en `public/platillos/`.
4. Carrito se vacía al cambiar de sucursal (precios distintos). No "arreglar" esto.
5. Deploy a producción SOLO cuando el dueño lo pida explícitamente.
6. Todo texto visible en español de México.

## Router de contexto — qué leer según la tarea
| Tarea | Leer | Código probable |
|---|---|---|
| Carrito / pedido WhatsApp / horarios de envío | docs/AI/modules/checkout-cart.md | src/store/useCart.ts, src/components/CartDrawer.tsx, src/lib/hours.ts |
| Menú, precios, categorías, búsqueda, extras | docs/AI/modules/catalog-menu.md | src/data/, scripts/parse-menus.mjs, MenuSection, ProductCard |
| Sucursales, ciudades, geolocalización, horarios | docs/AI/modules/branches-delivery.md | src/data/locations.ts, LocationPicker, LocationsSection, api/geo |
| Promos / banner / ventas sugeridas | docs/AI/modules/promotions-upselling.md | PromoBanner.tsx |
| Programa de lealtad (futuro) | docs/AI/modules/club-dushi.md | (no implementado) |
| Colores, tipografía, logo, animaciones | docs/AI/modules/visual-identity.md | tailwind.config.ts, globals.css, KanjiField |
| WhatsApp, Vercel, delivery apps | docs/AI/modules/integrations.md | locations.ts, api/geo |

## Protocolo obligatorio para cada tarea
1. Identificar el tipo de tarea.
2. Leer `docs/AI/CURRENT_TASK.md`.
3. Consultar `docs/AI/CONTEXT_INDEX.md` solo si no está claro qué módulo aplica.
4. Leer únicamente los documentos modulares relacionados.
5. Abrir solo los archivos de código directamente relacionados.
6. Seguir importaciones/dependencias solo cuando sea necesario.
7. NO leer todos los documentos de `docs/AI/`.
8. NO explorar todo el repositorio.
9. NO leer módulos ajenos a la modificación.
10. NO implementar mejoras no solicitadas.
11. NO leer `/archive` salvo solicitud expresa.

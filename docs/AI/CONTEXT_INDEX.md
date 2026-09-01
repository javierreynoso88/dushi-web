# CONTEXT_INDEX — mapa de contexto selectivo

Consulta esta tabla SOLO si CLAUDE.md no dejó claro qué módulo aplica.
Lee un módulo, no todos.

## Carrito / checkout / pedido WhatsApp
- Contexto: `modules/checkout-cart.md`
- Código: `src/store/useCart.ts`, `src/components/CartDrawer.tsx`, `src/lib/hours.ts`
- Reglas: `.claude/rules/checkout.md`
- NO leer: catalog-menu, visual-identity, club-dushi

## Menú / precios / categorías / búsqueda / extras
- Contexto: `modules/catalog-menu.md`
- Código: `content/*.md`, `scripts/parse-menus.mjs`, `src/data/*`,
  `src/components/MenuSection.tsx`, `src/components/ProductCard.tsx`
- Reglas: `.claude/rules/catalog.md`
- NO leer: checkout-cart (salvo que cambie el flujo de agregar), branches-delivery

## Sucursales / ciudades / geo-IP / horarios
- Contexto: `modules/branches-delivery.md`
- Código: `src/data/locations.ts`, `src/store/useLocation.ts`,
  `src/components/LocationPicker.tsx`, `src/components/LocationsSection.tsx`,
  `src/app/api/geo/route.ts`, `src/lib/hours.ts`
- Reglas: `.claude/rules/delivery.md`
- NO leer: catalog-menu, visual-identity

## Promociones / banner / upselling
- Contexto: `modules/promotions-upselling.md`
- Código: `src/components/PromoBanner.tsx`
- Reglas: `.claude/rules/promotions.md`
- NO leer: los demás módulos

## Programa de lealtad (Club Dushi — NO implementado)
- Contexto: `modules/club-dushi.md`
- Código: no existe aún
- Reglas: `.claude/rules/loyalty.md`

## Diseño / colores / tipografía / logo / animaciones
- Contexto: `modules/visual-identity.md`
- Código: `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx`,
  `src/components/KanjiField.tsx`, `public/dushi-logo-*.svg`
- Reglas: `.claude/rules/design.md`
- NO leer: checkout-cart, catalog-menu (salvo que el cambio toque esas UIs)

## Integraciones externas (WhatsApp, Vercel, delivery apps)
- Contexto: `modules/integrations.md`
- Código: `src/data/locations.ts`, `src/app/api/geo/route.ts`
- Reglas: `.claude/rules/delivery.md`
- NO leer: visual-identity, club-dushi

## Secciones informativas (Hero, Ikigai, Footer, Header)
- Sin módulo propio: abrir directamente el componente en `src/components/`.
- Si el cambio es visual, leer `modules/visual-identity.md`.

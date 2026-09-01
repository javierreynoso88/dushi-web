# Módulo: Catálogo / Menú

Menú por sucursal, búsqueda, extras y tarjetas de producto.

## Archivos clave
- `content/*.md` — FUENTE de verdad de platillos y precios (uno por sucursal).
- `scripts/parse-menus.mjs` — genera `src/data/menus.ts` (NO editar el generado).
- `src/data/menus.ts` (GENERADO), `src/data/menu.ts` (tipos), `src/data/extras.ts`.
- `src/components/MenuSection.tsx` (rail, búsqueda), `ProductCard.tsx` (tarjeta+extra).

## Reglas de negocio
- Editar menú = editar `content/*.md` y correr `node scripts/parse-menus.mjs`.
- Precios en MXN, enteros. Variantes (proteína, 1/3 pzas, cortes) se explotan a ítems.
- Cada menú incluye una categoría "Extras" (inyectada desde el de Monterrey).
- Búsqueda: ignora acentos, mayúsculas y ESPACIOS ("dushibox"→"Dushi Box").
- Extra en rollos: SOLO "Empanizado" (+$20), colapsado, con leyenda de preparación.
  Boxes = promo fija, sin extras.

## Fotos
- `public/platillos/<slug>.jpg`. El parser vincula por nombre (tokens, sin acentos,
  plural, contexto de categoría). ~95% cubierto; resto usa `public/menu/*` (PDF viejo).

## Riesgos
- No romper la firma de MENUS (Record<menuId, Category[]>) — la usan otros componentes.
- Regenerar siempre tras tocar `content/` o el parser; verificar cobertura de fotos.

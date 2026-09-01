---
description: Reglas de menú y datos
paths:
  - 'content/*.md'
  - 'scripts/parse-menus.mjs'
  - 'src/data/menus.ts'
  - 'src/data/menu.ts'
  - 'src/data/extras.ts'
  - 'src/components/MenuSection.tsx'
  - 'src/components/ProductCard.tsx'
---

# Catálogo / Menú
- NUNCA editar `src/data/menus.ts` a mano: es generado. Editar `content/*.md` y correr
  `node scripts/parse-menus.mjs`.
- Precios en MXN enteros. No inventar platillos ni precios; salen del content.
- Extra de rollo: solo "Empanizado" (+$20) con su leyenda. Boxes sin extras.
- Búsqueda debe seguir ignorando acentos, mayúsculas y espacios.
- Fotos: `public/platillos/<slug>.jpg`; el parser las vincula por nombre. No romperlo.
- Contexto: docs/AI/modules/catalog-menu.md

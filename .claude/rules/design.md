---
description: Reglas de identidad visual
paths:
  - 'tailwind.config.ts'
  - 'src/app/globals.css'
  - 'src/app/layout.tsx'
  - 'src/components/KanjiField.tsx'
  - 'src/components/Logo.tsx'
---

# Identidad visual
- Usar tokens Tailwind (night/card/caramel/...). No hardcodear hex fuera de config/globals.
- Amarillo mostaza = acento principal; salmón/rojo solo detalles/promos.
- Logo oficial intacto (no redibujar/deformar/recolorear/sombrear).
- Kanji decorativo: aria-hidden + respetar prefers-reduced-motion. No inventar caracteres.
- Secciones transparentes para no tapar KanjiField. Radios 0–8px, sin glassmorphism/neón.
- Máx 2 fuentes. Descripciones ≥15px en móvil. Sin fotos de stock.
- Contexto: docs/AI/modules/visual-identity.md

# Módulo: Identidad Visual

Extensión digital del menú físico: verde bosque + amarillo mostaza, tipografía condensada.

## Archivos clave
- `tailwind.config.ts` — tokens de color, radios (4–8px), fuentes.
- `src/app/globals.css` — variables CSS, textura de ruido, animación kanji, botones.
- `src/app/layout.tsx` — Bebas Neue (display) + Barlow Condensed (cuerpo) vía next/font.
- `src/components/KanjiField.tsx` — fondo 生き甲斐 con parallax + flotación.
- `public/dushi-logo-dark.svg` / `dushi-logo-light.svg` — logo oficial (ver Logo.tsx).

## Paleta (HEX)
- Fondo night #141B12 · card #1B2419 · lift #202A1E · abyss #0E120D · edge #2A3527
- Acento caramel(mostaza) #EABB1C · ember #F2C735 · deepgold #C99A12
- cream #F2EFE6 · cream2 #D8D7CF · smoke #92988E · salmon #F05A28 · redsalmon #C9342F

## Reglas
- Amarillo = acento principal (títulos, precios, CTAs). Salmón/rojo solo detalles/promos.
- Títulos en MAYÚSCULAS, condensados. Máx 2 familias. Descripciones ≥15px en móvil.
- Logo oficial intacto: no redibujar, deformar, recolorear ni sombrear.
- Kanji 生き甲斐 decorativo: aria-hidden, respeta prefers-reduced-motion. No inventar
  otros caracteres. Sin fotos de stock; usar `public/platillos/`.
- Radios bajos (0–8px), sombras suaves. Sin glassmorphism ni neón.

## Riesgos
- Secciones son transparentes para dejar ver KanjiField (fondo = body). No poner bg-night
  opaco en secciones o se tapa el efecto.

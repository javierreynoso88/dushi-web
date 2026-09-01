---
description: Reglas de verificación
paths:
  - 'src/**/*.tsx'
  - 'src/**/*.ts'
  - 'scripts/parse-menus.mjs'
---

# Verificación
- No hay suite automatizada. Verificación = `npm run build` sin errores + revisión visual.
- Tras tocar `content/` o el parser: correr `node scripts/parse-menus.mjs` y revisar salida.
- `npm run build` local pisa `.next` del dev server: reiniciar dev tras un build.
- No introducir dependencias nuevas solo para pruebas.

---
description: Reglas de sucursales y geolocalización
paths:
  - 'src/data/locations.ts'
  - 'src/store/useLocation.ts'
  - 'src/components/LocationPicker.tsx'
  - 'src/components/LocationsSection.tsx'
  - 'src/app/api/geo/route.ts'
  - 'src/lib/hours.ts'
---

# Sucursales / Delivery
- 4 sucursales reales; no inventar direcciones ni horarios. Monterrey cierra lunes.
- WhatsApp: Veracruz 522299275377 · Monterrey 528113063020. No cambiar sin aviso.
- Cambiar sucursal debe seguir vaciando el carrito (precios distintos).
- geo-IP solo funciona en Vercel; en local null (comportamiento correcto).
- No cambiar IDs de sucursal sin migrar localStorage (rompe sesiones guardadas).
- Contexto: docs/AI/modules/branches-delivery.md

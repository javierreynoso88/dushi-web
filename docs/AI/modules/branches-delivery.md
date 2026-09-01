# Módulo: Sucursales y Cobertura

Gate ciudad→sucursal, geolocalización por IP, horarios.

## Archivos clave
- `src/data/locations.ts` — 4 sucursales (id, city, menuId, phone, schedule, maps).
- `src/store/useLocation.ts` — gate, ciudad/sucursal, persist, sugerencia por IP.
- `src/components/LocationPicker.tsx` (modal), `LocationsSection.tsx` (tarjetas).
- `src/app/api/geo/route.ts` — deriva ciudad de headers Vercel.
- `src/lib/hours.ts` — abierto/cerrado por día.

## Datos vigentes (sucursales)
- Veracruz: Plaza Américas, Martí (José Martí 740, Reforma), Cuauhtémoc (Hernán Cortés 3347).
- Monterrey: Plaza Annya (Puerta de Hierro 8993, Cumbres Madeira). LUNES CERRADO.
- Horarios: Plaza Américas/Cuauhtémoc/Annya L–J 13:00–20:30, V–D 13:00–21:30;
  Martí L–D 13:00–21:30; Annya cierra lunes.

## Reglas de negocio
- Flujo: elegir ciudad → sucursal → su menú. Veracruz(3)/Monterrey(1, autoselección).
- Geo-IP: VER/PUE/OAX/TAB→Veracruz; NLE/COA/TAM→Monterrey; solo sugiere, no fuerza.
- Cambiar sucursal cambia menú y vacía carrito.

## Riesgos
- geo solo funciona en Vercel (headers). En local devuelve null → sin sugerencia (OK).
- Cambiar IDs de sucursal invalida localStorage viejo → cae al fallback (LOCATIONS[0]).

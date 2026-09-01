# Módulo: Integraciones Externas

## WhatsApp (pedidos) — ACTIVO
- `wa.me/<phone>?text=<mensaje>`. Números: Veracruz 522299275377 · Monterrey 528113063020.
- Definidos en `src/data/locations.ts` (campo `phone`). wa.link antiguos NO sirven
  (no aceptan texto prellenado). Mensaje se arma en `CartDrawer.tsx`.

## Geolocalización — ACTIVO (solo en Vercel)
- `src/app/api/geo/route.ts` lee `x-vercel-ip-country-region` / `-country`.
- En local devuelve null. No depende de servicios de terceros.

## Vercel (hosting/deploy) — ACTIVO
- `npx vercel --prod --yes`. Alias producción: dushi-web-seven.vercel.app.
- Deploy SOLO con autorización expresa del dueño.

## Delivery apps — NO CONFIGURADAS
- Uber Eats / Rappi / DiDi: links "#" placeholder en `locations.ts` y Footer/Delivery.
- Pendiente: URLs reales por sucursal.

## Dominio
- dushi.mx NO conectado a Vercel (pendiente DNS).

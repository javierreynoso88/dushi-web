# Módulo: Carrito y Checkout

Carrito con extras + envío del pedido por WhatsApp. Sin pagos en línea.

## Archivos clave
- `src/store/useCart.ts` — estado (Zustand persist v2, key=id::extras).
- `src/components/CartDrawer.tsx` — drawer, botón flotante, mensaje WhatsApp, programación.
- `src/lib/hours.ts` — isOpen/todayHours (zona America/Mexico_City).

## Reglas de negocio
- Total INFORMATIVO; la sucursal confirma precio final y envío por WhatsApp.
- Fuera de horario: pedido programado OBLIGATORIO (fecha+hora). Dentro: opcional.
- Carrito se vacía al cambiar de sucursal (lo dispara useLocation.setSucursal).
- Mensaje incluye: saludo con sucursal, líneas con extras, Total, campos
  Nombre/Dirección/Pago. Programado antepone "*PROGRAMAR* … fecha … hora".
- Número destino = `selected.phone` (ver branches-delivery / integrations).

## Dependencias
- Lee sucursal de `useLocation`/`useSelectedLocation` (no duplicar lógica de sucursal).
- `cartTotal`/`itemUnitPrice` viven en el store; reutilizar, no recalcular.

## Riesgos
- Cambiar el formato del mensaje puede romper el flujo que espera la sucursal.
- persist versionado: subir `version` + `migrate` si cambia el shape de CartItem.

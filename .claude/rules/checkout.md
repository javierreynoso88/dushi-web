---
description: Reglas de carrito y checkout
paths:
  - 'src/store/useCart.ts'
  - 'src/components/CartDrawer.tsx'
  - 'src/lib/hours.ts'
---

# Carrito / Checkout
- No agregar pasarela de pago; el pedido se cierra por WhatsApp.
- Mantener campos del mensaje: Nombre / Dirección de entrega / Forma de pago.
- Fuera de horario: forzar pedido programado (fecha+hora). No permitir enviar sin ambos.
- El total es informativo (la sucursal confirma). No prometer precio final ni envío gratis.
- Si cambia el shape de CartItem en el store: subir `version` y ajustar `migrate`.
- Número destino siempre = `selected.phone`. No hardcodear números aquí.
- Contexto: docs/AI/modules/checkout-cart.md

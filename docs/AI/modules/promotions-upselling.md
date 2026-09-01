# Módulo: Promociones y Upselling

## Estado
- Único elemento activo: banner superior en `src/components/PromoBanner.tsx`
  ("Martes 2×1 en rolls clásicos · Envío gratis en pedidos +$350").
- NO CONFIRMADO que esos términos sean vigentes — validar con el dueño antes de citar.

## Archivos clave
- `src/components/PromoBanner.tsx` (texto e ícono; color salmón, único uso del acento).

## Reglas
- El banner es la barra fija dentro del Header; no romper el offset de altura (~109px)
  del que dependen Hero/MenuSection sticky.
- Upselling (sugerir extras/complementos) NO implementado. Marcar como futuro.

## Riesgos
- Cambiar altura del banner desajusta `top-[109px]` del rail y `pt-[110px]` del hero.

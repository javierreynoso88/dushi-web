'use client'

import { useEffect, useState } from 'react'
import {
  CalendarClock,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
  X,
  MessageCircle,
  MapPin,
} from 'lucide-react'
import { useCart, cartCount, cartTotal, itemUnitPrice, type CartItem } from '@/store/useCart'
import { useLocation, useSelectedLocation } from '@/store/useLocation'
import { isOpen, todayHours } from '@/lib/hours'
import type { Location } from '@/data/locations'

function buildWhatsAppUrl(
  loc: Location,
  items: CartItem[],
  schedule: { date: string; time: string } | null,
) {
  const lines = items.flatMap((i) => {
    const unit = itemUnitPrice(i)
    const main = `• ${i.qty}× ${i.name}${i.pieces ? ` (${i.pieces})` : ''} — $${
      i.qty * unit
    }${i.from ? ' (precio base)' : ''}`
    const ex = i.extras.map((e) => `   ◦ extra: ${e.name} (+$${e.price})`)
    return [main, ...ex]
  })
  const total = cartTotal(items)
  const msg = [
    `¡Hola Dushi ${loc.cityLabel} · ${loc.name}! 🍣`,
    schedule
      ? `Quiero *PROGRAMAR* un pedido a domicilio para el *${schedule.date}* a las *${schedule.time}*:`
      : 'Quiero pedir a domicilio:',
    '',
    ...lines,
    '',
    `*Total: $${total}*`,
    '',
    'Nombre:',
    'Dirección de entrega:',
    'Forma de pago:',
  ].join('\n')
  return `https://wa.me/${loc.phone}?text=${encodeURIComponent(msg)}`
}

export function CartDrawer() {
  const { items, drawerOpen, openDrawer, closeDrawer, setQty, remove, clear } =
    useCart()
  const { openPicker } = useLocation()
  const selected = useSelectedLocation()

  const [mounted, setMounted] = useState(false)
  const [wantSchedule, setWantSchedule] = useState(false)
  const [schedDate, setSchedDate] = useState('')
  const [schedTime, setSchedTime] = useState('')
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  const count = cartCount(items)
  const total = cartTotal(items)
  const open = isOpen(selected)
  // fuera de horario el pedido SIEMPRE va programado
  const mustSchedule = !open
  const scheduling = mustSchedule || wantSchedule
  const scheduleReady = !scheduling || (schedDate && schedTime)
  const waUrl = buildWhatsAppUrl(
    selected,
    items,
    scheduling && schedDate && schedTime
      ? { date: schedDate, time: schedTime }
      : null,
  )
  const todayISO = new Date().toISOString().slice(0, 10)

  return (
    <>
      {/* Botón flotante */}
      {count > 0 && !drawerOpen && (
        <button
          onClick={openDrawer}
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-caramel px-6 py-4 font-semibold text-night shadow-[0_8px_30px_rgba(234,187,28,0.35)] transition-all hover:bg-ember sm:bottom-8 sm:right-8"
          aria-label="Ver carrito"
        >
          <span className="relative">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-2.5 -top-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-night text-[11px] font-bold text-cream">
              {count}
            </span>
          </span>
          <span className="hidden sm:inline">Ver pedido</span>
          <span className="font-display font-bold">${total}</span>
        </button>
      )}

      {/* Drawer */}
      {drawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/70 backdrop-blur-sm"
          onClick={closeDrawer}
        >
          <aside
            className="flex h-full w-full max-w-md flex-col border-l border-edge bg-card"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-edge p-5">
              <div>
                <h3 className="font-display text-xl font-bold text-cream">
                  Tu pedido
                </h3>
                <button
                  onClick={() => {
                    closeDrawer()
                    openPicker()
                  }}
                  className="mt-0.5 flex items-center gap-1 text-sm text-smoke transition-colors hover:text-caramel"
                >
                  <MapPin className="h-3.5 w-3.5 text-caramel" />
                  {selected.cityLabel} · {selected.name} — cambiar
                </button>
              </div>
              <button
                onClick={closeDrawer}
                className="rounded-full p-2 text-smoke hover:bg-night hover:text-cream"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center">
                  <ShoppingBag className="h-10 w-10 text-smoke/40" />
                  <p className="text-smoke">Tu carrito está vacío.</p>
                  <button onClick={closeDrawer} className="btn-ghost mt-2">
                    Ver el menú
                  </button>
                </div>
              ) : (
                <ul className="space-y-4">
                  {items.map((i) => (
                    <li
                      key={i.key}
                      className="flex items-center gap-3 rounded-2xl border border-edge bg-night p-4"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold leading-snug text-cream">
                          {i.name}
                        </p>
                        <p className="text-sm text-smoke">
                          {i.pieces ? `${i.pieces} · ` : ''}${itemUnitPrice(i)}
                          {i.from ? ' (base)' : ''} c/u
                        </p>
                        {i.extras.length > 0 && (
                          <p className="mt-0.5 text-xs text-caramel">
                            {i.extras
                              .map((e) => `+ ${e.name} ($${e.price})`)
                              .join(' · ')}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setQty(i.key, i.qty - 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-cream hover:border-caramel"
                          aria-label="Quitar uno"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-6 text-center font-display font-bold text-cream">
                          {i.qty}
                        </span>
                        <button
                          onClick={() => setQty(i.key, i.qty + 1)}
                          className="flex h-8 w-8 items-center justify-center rounded-full border border-edge text-cream hover:border-caramel"
                          aria-label="Agregar uno"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="w-16 text-right">
                        <p className="font-display font-bold text-caramel">
                          ${i.qty * itemUnitPrice(i)}
                        </p>
                        <button
                          onClick={() => remove(i.key)}
                          className="mt-1 text-smoke/60 hover:text-caramel"
                          aria-label={`Eliminar ${i.name}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="space-y-3 border-t border-edge p-5">
                <div className="flex items-center justify-between">
                  <span className="text-smoke">Total</span>
                  <span className="font-display text-2xl font-black text-cream">
                    ${total}
                  </span>
                </div>

                {/* Horario / programación */}
                {mustSchedule ? (
                  <div className="rounded-2xl border border-caramel/40 bg-caramel/10 p-4">
                    <p className="flex items-center gap-2 text-sm font-semibold text-caramel">
                      <CalendarClock className="h-4 w-4" />
                      Sucursal cerrada — programa tu pedido
                    </p>
                    <p className="mt-1 text-xs text-smoke">
                      {todayHours(selected)} · {selected.hoursLabel}
                    </p>
                  </div>
                ) : (
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-smoke">
                    <input
                      type="checkbox"
                      checked={wantSchedule}
                      onChange={(e) => setWantSchedule(e.target.checked)}
                      className="h-4 w-4 accent-[#EABB1C]"
                    />
                    <CalendarClock className="h-4 w-4" />
                    Programar para otra fecha/hora
                  </label>
                )}

                {scheduling && (
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="date"
                      value={schedDate}
                      min={todayISO}
                      onChange={(e) => setSchedDate(e.target.value)}
                      className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm text-cream focus:border-caramel focus:outline-none [color-scheme:dark]"
                      aria-label="Fecha del pedido"
                    />
                    <input
                      type="time"
                      value={schedTime}
                      onChange={(e) => setSchedTime(e.target.value)}
                      className="rounded-xl border border-edge bg-night px-3 py-2.5 text-sm text-cream focus:border-caramel focus:outline-none [color-scheme:dark]"
                      aria-label="Hora del pedido"
                    />
                    <p className="col-span-2 text-xs text-smoke/60">
                      Horario de la sucursal: {selected.hoursLabel}
                    </p>
                  </div>
                )}

                <p className="text-xs text-smoke/60">
                  El total es informativo; la sucursal confirma precio final y
                  costo de envío por WhatsApp.
                </p>

                <a
                  href={scheduleReady ? waUrl : undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-disabled={!scheduleReady}
                  onClick={(e) => {
                    if (!scheduleReady) e.preventDefault()
                  }}
                  className={`flex w-full items-center justify-center gap-2 rounded-full px-6 py-4 font-semibold text-night transition-all ${
                    scheduleReady
                      ? 'bg-caramel hover:bg-ember'
                      : 'cursor-not-allowed bg-smoke/30'
                  }`}
                >
                  <MessageCircle className="h-5 w-5" />
                  {scheduling
                    ? scheduleReady
                      ? 'Programar pedido por WhatsApp'
                      : 'Elige fecha y hora'
                    : 'Pedir a domicilio por WhatsApp'}
                </a>
                <button
                  onClick={clear}
                  className="w-full text-center text-sm text-smoke/60 transition-colors hover:text-caramel"
                >
                  Vaciar carrito
                </button>
              </div>
            )}
          </aside>
        </div>
      )}
    </>
  )
}

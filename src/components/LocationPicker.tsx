'use client'

import { useEffect, useState } from 'react'
import { ArrowLeft, Clock, MapPin, X } from 'lucide-react'
import { CITIES, LOCATIONS } from '@/data/locations'
import { useLocation } from '@/store/useLocation'
import { isOpen, todayHours } from '@/lib/hours'
import { Logo } from './Logo'

export function LocationPicker() {
  const {
    gateOpen,
    gateStep,
    cityId,
    selectedId,
    suggestedCity,
    setCity,
    setSucursal,
    setSuggestedCity,
    closePicker,
  } = useLocation()

  // evita hydration mismatch (persist)
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  // detecta ciudad por IP una vez, solo si aún no hay selección
  useEffect(() => {
    if (!mounted) return
    if (selectedId || suggestedCity) return
    fetch('/api/geo')
      .then((r) => r.json())
      .then((d) => {
        if (d.city === 'veracruz' || d.city === 'monterrey')
          setSuggestedCity(d.city)
      })
      .catch(() => {})
  }, [mounted, selectedId, suggestedCity, setSuggestedCity])

  if (!mounted || !gateOpen) return null

  const canClose = Boolean(selectedId)
  const branches = LOCATIONS.filter((l) => l.city === (cityId ?? 'monterrey'))

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={canClose ? closePicker : undefined}
    >
      <div
        className="w-full max-w-lg rounded-t-4xl border border-edge bg-card p-6 shadow-2xl sm:rounded-4xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <Logo variant="light" className="h-10 w-auto" />
          {canClose && (
            <button
              onClick={closePicker}
              className="rounded-full p-2 text-smoke hover:bg-night hover:text-cream"
              aria-label="Cerrar"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {gateStep === 'city' ? (
          <>
            <h3 className="mt-6 font-display text-2xl font-bold text-cream">
              ¿Dónde quieres pedir?
            </h3>
            <p className="mt-1 text-sm text-smoke">
              Elige tu ciudad para mostrarte el menú correcto.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {CITIES.map((c) => {
                const suggested = suggestedCity === c.id
                const n = LOCATIONS.filter((l) => l.city === c.id).length
                return (
                  <button
                    key={c.id}
                    onClick={() => setCity(c.id)}
                    className={`relative flex flex-col items-center gap-2 rounded-3xl border p-6 transition-all ${
                      suggested
                        ? 'border-caramel bg-caramel/10 shadow-[0_0_20px_rgba(234,187,28,0.12)]'
                        : 'border-edge hover:border-cream/30 hover:bg-night'
                    }`}
                  >
                    {suggested && (
                      <span className="absolute -top-2.5 rounded-full bg-caramel px-3 py-0.5 text-[11px] font-semibold text-night">
                        Estás aquí
                      </span>
                    )}
                    <span className="text-4xl">{c.emoji}</span>
                    <span className="font-display text-xl font-bold text-cream">
                      {c.label}
                    </span>
                    <span className="text-xs text-smoke">
                      {n} sucursal{n > 1 ? 'es' : ''}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        ) : (
          <>
            <button
              onClick={() => useLocation.setState({ gateStep: 'city' })}
              className="mt-6 flex items-center gap-1 text-sm text-smoke hover:text-caramel"
            >
              <ArrowLeft className="h-4 w-4" /> Cambiar ciudad
            </button>
            <h3 className="mt-2 font-display text-2xl font-bold text-cream">
              Elige tu sucursal
            </h3>
            <p className="mt-1 text-sm text-smoke">
              Cada sucursal tiene su propio menú y precios.
            </p>

            <div className="mt-5 space-y-3">
              {branches.map((loc) => {
                const open = isOpen(loc)
                const isSel = selectedId === loc.id
                return (
                  <button
                    key={loc.id}
                    onClick={() => setSucursal(loc.id)}
                    className={`flex w-full items-start gap-4 rounded-2xl border p-4 text-left transition-all ${
                      isSel
                        ? 'border-caramel bg-caramel/10'
                        : 'border-edge hover:border-cream/30 hover:bg-night'
                    }`}
                  >
                    <span className="mt-0.5 text-2xl">{loc.emoji}</span>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="font-semibold text-cream">
                          {loc.name}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                            open
                              ? 'bg-[#3d8b40]/20 text-[#7fc982]'
                              : 'bg-smoke/15 text-smoke'
                          }`}
                        >
                          {open ? 'Abierta' : 'Cerrada'}
                        </span>
                      </span>
                      <span className="mt-1 flex items-start gap-1.5 text-xs text-smoke">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                        {loc.address}
                      </span>
                      <span className="mt-1 flex items-center gap-1.5 text-xs text-smoke">
                        <Clock className="h-3 w-3 shrink-0" />
                        {todayHours(loc)} · {loc.hoursLabel}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mt-4 text-center text-xs text-smoke/60">
              Si la sucursal está cerrada puedes dejar tu pedido programado.
            </p>
          </>
        )}
      </div>
    </div>
  )
}

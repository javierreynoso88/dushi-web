'use client'

import { Clock, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { LOCATIONS } from '@/data/locations'
import { useLocation, useSelectedLocation } from '@/store/useLocation'
import { isOpen } from '@/lib/hours'

export function LocationsSection() {
  const { setSucursal } = useLocation()
  const selected = useSelectedLocation()

  return (
    <section
      id="sucursales"
      className="border-t border-edge py-16 lg:py-24"
    >
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Visítanos</span>
          <h2 className="mt-3 font-display text-4xl font-black text-cream sm:text-5xl">
            NUESTRAS SUCURSALES
          </h2>
          <p className="mt-4 text-smoke">
            Selecciona la tuya para ver su menú y ordenar al lugar correcto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {LOCATIONS.map((loc) => {
            const isActive = selected.id === loc.id
            const open = isOpen(loc)
            return (
              <article
                key={loc.id}
                className={`flex flex-col rounded-3xl border bg-card p-6 transition-all ${
                  isActive
                    ? 'border-caramel shadow-[0_0_30px_rgba(234,187,28,0.12)]'
                    : 'border-edge hover:border-cream/25'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-widest text-caramel">
                    {loc.emoji} {loc.cityLabel}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                      open
                        ? 'bg-[#3d8b40]/20 text-[#7fc982]'
                        : 'bg-smoke/15 text-smoke'
                    }`}
                  >
                    {open ? 'Abierta' : 'Cerrada'}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-2xl font-bold text-cream">
                  {loc.name}
                </h3>
                {isActive && (
                  <span className="mt-1 text-xs font-semibold text-caramel">
                    Seleccionada — viendo su menú
                  </span>
                )}

                <p className="mt-4 flex items-start gap-2 text-sm text-smoke">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-smoke/50" />
                  {loc.address}
                </p>
                <p className="mt-3 flex items-center gap-2 text-sm text-smoke">
                  <Clock className="h-4 w-4 shrink-0 text-smoke/50" />
                  {loc.hoursLabel}
                </p>
                {loc.contactPhone && (
                  <p className="mt-3 flex items-center gap-2 text-sm text-smoke">
                    <Phone className="h-4 w-4 shrink-0 text-smoke/50" />
                    {loc.contactPhone}
                  </p>
                )}

                <div className="mt-6 flex flex-1 flex-col justify-end gap-2">
                  {!isActive && (
                    <button
                      onClick={() => setSucursal(loc.id)}
                      className="btn-ghost w-full py-3"
                    >
                      Ver su menú
                    </button>
                  )}
                  <div className="flex gap-2">
                    <a
                      href={loc.whatsapp}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-caramel px-4 py-3 text-sm font-semibold text-night transition-all hover:bg-ember"
                    >
                      <MessageCircle className="h-4 w-4" />
                      WhatsApp
                    </a>
                    <a
                      href={loc.maps}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 rounded-full border border-edge px-4 py-3 text-sm font-semibold text-cream transition-colors hover:border-caramel"
                      aria-label="Cómo llegar"
                    >
                      <Navigation className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

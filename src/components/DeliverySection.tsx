'use client'

import { MessageCircle, Smartphone } from 'lucide-react'
import { useSelectedLocation } from '@/store/useLocation'

export function DeliverySection() {
  const selected = useSelectedLocation()

  return (
    <section className="py-16">
      <div className="container-site">
        <div className="overflow-hidden rounded-4xl border border-edge bg-gradient-to-br from-card to-night px-8 py-12 lg:px-16 lg:py-16">
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <div>
              <span className="eyebrow">Pide en segundos</span>
              <h2 className="mt-3 font-display text-3xl font-black text-cream sm:text-4xl">
                ENCUÉNTRANOS EN TU PLATAFORMA FAVORITA
              </h2>
              <p className="mt-4 max-w-md text-smoke">
                Ordena directo por WhatsApp o pídelo a domicilio en{' '}
                {selected.cityLabel} con tu app de delivery preferida.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <a
                href={selected.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-2xl bg-caramel px-6 py-4 font-semibold text-night transition-all hover:bg-ember"
              >
                <span className="flex items-center gap-3">
                  <MessageCircle className="h-5 w-5" />
                  Ordenar por WhatsApp
                </span>
                <span className="text-sm text-night/70">{selected.name}</span>
              </a>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { name: 'Uber Eats', href: selected.delivery.uberEats },
                  { name: 'Rappi', href: selected.delivery.rappi },
                  { name: 'DiDi Food', href: selected.delivery.didiFood },
                ].map((d) => (
                  <a
                    key={d.name}
                    href={d.href ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 rounded-2xl border border-edge bg-card px-3 py-4 text-center text-sm font-medium text-cream transition-colors hover:border-caramel/50"
                  >
                    <Smartphone className="h-5 w-5 text-caramel" />
                    {d.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

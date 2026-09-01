'use client'

import { MapPin, Star } from 'lucide-react'
import { useLocation, useSelectedLocation } from '@/store/useLocation'

export function Hero() {
  const { openPicker } = useLocation()
  const selected = useSelectedLocation()

  return (
    <section id="top" className="relative overflow-hidden pt-[110px]">
      {/* Kanji ikigai gigante de fondo */}
      <span
        aria-hidden
        className="pointer-events-none absolute -right-8 top-24 select-none font-display text-[22rem] font-black leading-none text-cream/[0.04] lg:text-[30rem]"
      >
        生
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 select-none font-display text-[18rem] font-black leading-none text-caramel/[0.06]"
      >
        甲
      </span>

      <div className="container-site relative grid items-center gap-10 py-12 lg:grid-cols-2 lg:py-24">
        <div className="animate-fade-up">
          <span className="eyebrow">生き甲斐 · Ikigai · Razón de ser</span>
          <h1 className="mt-4 font-display text-5xl font-black leading-[1.02] text-cream sm:text-6xl lg:text-7xl">
            SUSHI DE AUTOR,
            <br />
            <span className="text-caramel">HECHO CON ALMA.</span>
          </h1>
          <p className="mt-6 max-w-md text-lg text-smoke">
            Pescado fresco, recetas de la casa y el sabor que enamoró a
            Veracruz y Monterrey desde 2021. Ordena en minutos.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#menu" className="btn-primary px-8 py-4 text-base">
              Ver el menú
            </a>
            <button onClick={openPicker} className="btn-ghost px-6 py-4">
              <MapPin className="h-4 w-4 text-caramel" />
              {selected.cityLabel} · {selected.name}
            </button>
          </div>

          <div className="mt-8 flex items-center gap-6 text-sm text-smoke">
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-caramel text-caramel" /> 4.8 ·
              +12k pedidos
            </span>
            <span>Uber Eats · Rappi · DiDi</span>
          </div>
        </div>

        {/* Fotografía real de la casa, marco editorial */}
        <div className="animate-fade-up relative">
          <div className="overflow-hidden rounded-lg border border-edge">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/platillos/dushi-boat.jpg"
              alt="Dushi Boat — combinación de rollos de la casa"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-4 left-4 rounded-md border border-edge bg-card/95 px-5 py-3 backdrop-blur sm:left-0">
            <p className="font-display text-3xl tracking-wide text-caramel">
              +30
            </p>
            <p className="text-sm text-smoke">rollos y creaciones de la casa</p>
          </div>
        </div>
      </div>

      <div className="neon-line" />
    </section>
  )
}

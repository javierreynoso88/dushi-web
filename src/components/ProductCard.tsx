'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, Plus, AlertTriangle } from 'lucide-react'
import type { Product } from '@/data/menu'
import { useCart, type CartExtra } from '@/store/useCart'
import {
  EXTRAS,
  EMPANIZADO_ID,
  EMPANIZADO_LEGEND,
  isRollCategory,
  isBoxCategory,
} from '@/data/extras'

const EMPANIZADO = EXTRAS.find((e) => e.id === EMPANIZADO_ID)!

const TAG_STYLES: Record<string, string> = {
  nuevo: 'bg-caramel/15 text-caramel',
  picante: 'bg-salmon/15 text-salmon',
  favorito: 'bg-cream/10 text-cream',
  veggie: 'bg-[#9BB068]/15 text-[#9BB068]',
}

const TAG_LABELS: Record<string, string> = {
  nuevo: 'Nuevo',
  picante: '🌶 Picante',
  favorito: '★ Favorito',
  veggie: 'Veggie',
}

export function ProductCard({
  product,
  categoryName = '',
}: {
  product: Product
  categoryName?: string
}) {
  const { add } = useCart()
  const [added, setAdded] = useState(false)
  const [extraOpen, setExtraOpen] = useState(false)
  const [empanizado, setEmpanizado] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current)
    },
    [],
  )

  const isRoll = isRollCategory(categoryName)
  const isBox = isBoxCategory(categoryName)
  const price = product.price + (isRoll && empanizado ? EMPANIZADO.price : 0)

  const handleAdd = () => {
    const extras: CartExtra[] =
      isRoll && empanizado
        ? [{ id: EMPANIZADO.id, name: EMPANIZADO.name, price: EMPANIZADO.price }]
        : []
    add(product, extras)
    setAdded(true)
    setExtraOpen(false)
    setEmpanizado(false)
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => setAdded(false), 1200)
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-edge bg-card transition-all duration-200 hover:-translate-y-1 hover:border-caramel/60 hover:shadow-[0_8px_40px_rgba(234,187,28,0.10)]">
      <div className="relative aspect-[4/3] overflow-hidden bg-night">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.tags && product.tags.length > 0 && (
          <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
            {product.tags.map((t) => (
              <span
                key={t}
                className={`rounded px-2.5 py-1 text-[11px] font-semibold backdrop-blur ${TAG_STYLES[t]}`}
              >
                {TAG_LABELS[t]}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl uppercase leading-tight tracking-wide text-cream">
            {product.name}
          </h3>
          {product.pieces && (
            <span className="shrink-0 rounded bg-night px-2.5 py-1 text-xs font-medium text-smoke">
              {product.pieces}
            </span>
          )}
        </div>
        <p className="mt-2 flex-1 text-[15px] leading-relaxed text-smoke">
          {product.description}
        </p>

        {isBox && (
          <p className="mt-2 text-xs font-semibold text-caramel">
            Promoción fija — no admite cambios ni extras.
          </p>
        )}

        {/* Opción de extra (solo rollos), colapsada por defecto */}
        {isRoll && (
          <div className="mt-3">
            <button
              onClick={() => setExtraOpen((v) => !v)}
              className="flex min-h-[32px] items-center gap-1 text-sm font-medium text-smoke transition-colors hover:text-caramel"
              aria-expanded={extraOpen}
            >
              <ChevronDown
                className={`h-4 w-4 transition-transform ${extraOpen ? 'rotate-180' : ''}`}
              />
              ¿Quieres un extra?
            </button>

            {extraOpen && (
              <div className="mt-2 rounded-md border border-edge bg-night p-3">
                <label className="flex cursor-pointer items-center justify-between">
                  <span className="flex items-center gap-2.5">
                    <input
                      type="checkbox"
                      checked={empanizado}
                      onChange={(e) => setEmpanizado(e.target.checked)}
                      className="h-4 w-4 accent-[#EABB1C]"
                    />
                    <span className="text-sm font-medium text-cream">
                      Empanizado
                    </span>
                  </span>
                  <span className="text-sm font-semibold text-caramel">
                    +${EMPANIZADO.price}
                  </span>
                </label>
                {empanizado && (
                  <p className="mt-2 flex items-start gap-1.5 text-xs leading-snug text-caramel">
                    <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    {EMPANIZADO_LEGEND}
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between">
          <span className="font-display text-2xl tracking-wide text-caramel">
            {product.from && (
              <span className="mr-1 font-sans text-sm normal-case text-smoke">
                desde
              </span>
            )}
            ${price}
          </span>
          <button
            onClick={handleAdd}
            className={`flex min-h-[44px] items-center gap-1.5 rounded-md px-4 py-2 font-display text-base uppercase tracking-wider transition-all ${
              added
                ? 'bg-[#3d8b40] text-white'
                : 'bg-caramel text-night hover:bg-ember'
            }`}
          >
            {added ? (
              <>
                <Check className="h-4 w-4" />
                Agregado
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Agregar
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

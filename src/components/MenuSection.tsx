'use client'

import { useEffect, useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import { MENUS } from '@/data/menus'
import { useSelectedLocation } from '@/store/useLocation'
import { ProductCard } from './ProductCard'

// búsqueda sin acentos ni mayúsculas: "arrachera", "TAMPICO", "salmón/salmon"
const norm = (s: string) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")

export function MenuSection() {
  const selected = useSelectedLocation()
  const MENU = MENUS[selected.menuId] ?? []
  const [active, setActive] = useState('')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = norm(query.trim())
    if (!q) return null
    // sin espacios: "dushibox" encuentra "Dushi Box", "dushiball" → "Dushi Ball"
    const qFlat = q.replace(/\s+/g, '')
    return MENU.flatMap((cat) =>
      cat.items
        .filter(
          (p) =>
            norm(p.name).includes(q) ||
            norm(p.description).includes(q) ||
            norm(p.name).replace(/\s+/g, '').includes(qFlat),
        )
        .map((p) => ({ ...p, _cat: cat.name })),
    )
  }, [query])

  useEffect(() => {
    if (results) return // sin observer durante búsqueda
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-180px 0px -55% 0px', threshold: [0.1, 0.5] },
    )
    MENU.forEach((c) => {
      const el = document.getElementById(c.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [results, selected.menuId])

  return (
    <section id="menu" className="py-16 lg:py-24">
      <div className="container-site">
        <div className="mx-auto max-w-2xl text-center">
          <span className="eyebrow">Nuestra carta</span>
          <h2 className="mt-3 font-display text-4xl font-black text-cream sm:text-5xl">
            EL MENÚ DUSHI
          </h2>
          <p className="mt-2 text-sm font-semibold text-caramel">
            {selected.emoji} Sucursal {selected.name} · {selected.cityLabel}
          </p>
          <p className="mt-4 text-smoke">
            Busca tu platillo o navega por categoría. Agrega al carrito y pide
            por WhatsApp.
          </p>
        </div>
      </div>

      {/* Sticky: buscador + rail de categorías */}
      <div className="sticky top-[109px] z-30 mt-8 border-y border-edge bg-night/95 backdrop-blur">
        <div className="container-site space-y-2 py-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar platillo… ej. salmón, arrachera, tempura"
              className="w-full rounded-full border border-edge bg-card py-3 pl-11 pr-11 text-sm text-cream placeholder:text-smoke/60 focus:border-caramel focus:outline-none focus:ring-1 focus:ring-caramel/40 [&::-webkit-search-cancel-button]:hidden"
              aria-label="Buscar en el menú"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-smoke hover:text-cream"
                aria-label="Limpiar búsqueda"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {!results && (
            <div className="no-scrollbar flex gap-2 overflow-x-auto">
              {MENU.map((cat) => (
                <a
                  key={cat.id}
                  href={`#${cat.id}`}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all ${
                    active === cat.id
                      ? 'bg-caramel text-night'
                      : 'bg-card text-smoke hover:text-cream'
                  }`}
                >
                  {cat.name}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Resultados de búsqueda */}
      {results ? (
        <div className="container-site mt-10">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-edge pb-4">
            <h3 className="font-display text-2xl font-bold text-cream">
              {results.length > 0
                ? `Resultados para “${query.trim()}”`
                : `Sin resultados para “${query.trim()}”`}
            </h3>
            <span className="text-sm text-smoke/60">
              {results.length} platillo{results.length === 1 ? '' : 's'}
            </span>
          </div>
          {results.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((p) => (
                <ProductCard key={p.id} product={p} categoryName={p._cat} />
              ))}
            </div>
          ) : (
            <p className="py-10 text-center text-smoke">
              Intenta con otra palabra: “salmón”, “camarón”, “ramen”,
              “empanizado”…
            </p>
          )}
        </div>
      ) : (
        <div className="container-site mt-10 space-y-16">
          {MENU.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-[180px]">
              <div className="mb-6 flex items-end justify-between gap-4 border-b border-edge pb-4">
                <div>
                  <h3 className="font-display text-2xl font-bold text-cream sm:text-3xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 text-sm text-smoke">{cat.tagline}</p>
                </div>
                <span className="hidden text-sm text-smoke/60 sm:block">
                  {cat.items.length} platillos
                </span>
              </div>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {cat.items.map((p) => (
                  <ProductCard key={p.id} product={p} categoryName={cat.name} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

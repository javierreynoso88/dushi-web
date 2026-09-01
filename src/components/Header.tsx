'use client'

import { useEffect, useState } from 'react'
import { MapPin, Menu, X, ShoppingBag } from 'lucide-react'
import { Logo } from './Logo'
import { PromoBanner } from './PromoBanner'
import { useLocation, useSelectedLocation } from '@/store/useLocation'

const NAV = [
  { label: 'Menú', href: '#menu' },
  { label: 'Ikigai', href: '#ikigai' },
  { label: 'Sucursales', href: '#sucursales' },
  { label: 'Contacto', href: '#contacto' },
]

export function Header() {
  const { openPicker } = useLocation()
  const selected = useSelectedLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <PromoBanner />
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? 'border-b border-edge bg-night/95 backdrop-blur'
            : 'bg-transparent'
        }`}
      >
      <div className="container-site flex h-[72px] items-center justify-between gap-4">
        <a href="#top" className="flex items-center">
          <Logo variant="light" className="h-10 w-auto" />
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-cream/70 transition-colors hover:text-caramel"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openPicker}
            className="hidden items-center gap-2 rounded-full border border-cream/15 px-4 py-2 text-sm font-medium text-cream transition-colors hover:border-caramel sm:flex"
          >
            <MapPin className="h-4 w-4 text-caramel" />
            <span className="max-w-[140px] truncate">
              {selected.cityLabel} · {selected.name}
            </span>
          </button>

          <a href="#menu" className="btn-primary hidden sm:inline-flex">
            <ShoppingBag className="h-4 w-4" />
            Ordenar
          </a>

          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full border border-cream/15 p-2 text-cream lg:hidden"
            aria-label="Menú"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-t border-edge bg-night lg:hidden">
          <div className="container-site flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-base font-medium text-cream hover:bg-card"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false)
                openPicker()
              }}
              className="mt-1 flex items-center gap-2 rounded-xl px-3 py-3 text-left text-base font-medium text-cream hover:bg-card"
            >
              <MapPin className="h-5 w-5 text-caramel" />
              {selected.cityLabel} · {selected.name}
            </button>
          </div>
        </div>
      )}
      </div>
    </header>
  )
}

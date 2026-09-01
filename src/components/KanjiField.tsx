'use client'

import { useEffect, useRef } from 'react'

// Campo decorativo de 生き甲斐 (ikigai) repetido en columnas verticales.
// Parallax suave ligado al scroll + flotación lenta — "las palabras viven".
// Solo decorativo: aria-hidden, pointer-events-none, respeta prefers-reduced-motion.

const COLUMNS = [
  { left: '4%', size: 'clamp(3rem,6vw,5.5rem)', speed: 0.06, delay: '0s', opacity: 0.05 },
  { left: '22%', size: 'clamp(2rem,4vw,3.5rem)', speed: -0.04, delay: '-3s', opacity: 0.04 },
  { left: '46%', size: 'clamp(2.5rem,5vw,4.5rem)', speed: 0.09, delay: '-6s', opacity: 0.035 },
  { left: '68%', size: 'clamp(2rem,4vw,3.5rem)', speed: -0.07, delay: '-2s', opacity: 0.045 },
  { left: '88%', size: 'clamp(3rem,6vw,5rem)', speed: 0.05, delay: '-5s', opacity: 0.05 },
]

const TEXT = '生き甲斐 '.repeat(6)

export function KanjiField() {
  const refs = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const y = window.scrollY
        refs.current.forEach((el, i) => {
          if (el) el.style.transform = `translateY(${y * COLUMNS[i].speed}px)`
        })
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {COLUMNS.map((c, i) => (
        <span
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          className="kanji-col absolute -top-[10%] select-none font-display leading-none text-cream"
          style={{
            left: c.left,
            fontSize: c.size,
            opacity: c.opacity,
            animationDelay: c.delay,
            writingMode: 'vertical-rl',
            height: '130%',
          }}
        >
          {TEXT}
        </span>
      ))}
    </div>
  )
}

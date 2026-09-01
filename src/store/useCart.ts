import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/data/menu'

export type CartExtra = { id: string; name: string; price: number }

export type CartItem = {
  key: string // id + combinación de extras
  id: string
  name: string
  pieces?: string
  price: number // precio base del platillo
  from?: boolean
  qty: number
  extras: CartExtra[]
}

export const itemUnitPrice = (i: CartItem) =>
  i.price + i.extras.reduce((s, e) => s + e.price, 0)

type CartState = {
  items: CartItem[]
  drawerOpen: boolean
  add: (p: Product, extras?: CartExtra[]) => void
  remove: (key: string) => void
  setQty: (key: string, qty: number) => void
  clear: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      drawerOpen: false,
      add: (p, extras = []) =>
        set((s) => {
          const key = `${p.id}::${extras
            .map((e) => e.id)
            .sort()
            .join('+')}`
          const existing = s.items.find((i) => i.key === key)
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.key === key ? { ...i, qty: i.qty + 1 } : i,
              ),
            }
          }
          return {
            items: [
              ...s.items,
              {
                key,
                id: p.id,
                name: p.name,
                pieces: p.pieces,
                price: p.price,
                from: p.from,
                qty: 1,
                extras,
              },
            ],
          }
        }),
      remove: (key) =>
        set((s) => ({ items: s.items.filter((i) => i.key !== key) })),
      setQty: (key, qty) =>
        set((s) => ({
          items:
            qty <= 0
              ? s.items.filter((i) => i.key !== key)
              : s.items.map((i) => (i.key === key ? { ...i, qty } : i)),
        })),
      clear: () => set({ items: [] }),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
    }),
    {
      name: 'dushi-cart',
      version: 2,
      // carritos viejos (sin key/extras) se descartan
      migrate: () => ({ items: [] }),
      partialize: (s) => ({ items: s.items }),
    },
  ),
)

export const cartCount = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.qty, 0)

export const cartTotal = (items: CartItem[]) =>
  items.reduce((n, i) => n + i.qty * itemUnitPrice(i), 0)

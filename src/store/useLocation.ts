import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { LOCATIONS, type CityId, type Location } from '@/data/locations'
import { useCart } from './useCart'

type LocationState = {
  cityId: CityId | null
  selectedId: string | null
  suggestedCity: CityId | null // detectada por IP
  gateOpen: boolean
  gateStep: 'city' | 'branch'
  setCity: (c: CityId) => void
  setSucursal: (id: string) => void
  setSuggestedCity: (c: CityId | null) => void
  openPicker: () => void
  closePicker: () => void
}

export const useLocation = create<LocationState>()(
  persist(
    (set, get) => ({
      cityId: null,
      selectedId: null,
      suggestedCity: null,
      gateOpen: true,
      gateStep: 'city',
      setCity: (c) => {
        const branches = LOCATIONS.filter((l) => l.city === c)
        if (branches.length === 1) {
          // Veracruz: una sola sucursal — selección directa
          get().setSucursal(branches[0].id)
          set({ cityId: c })
        } else {
          set({ cityId: c, gateStep: 'branch' })
        }
      },
      setSucursal: (id) => {
        const prev = get().selectedId
        const loc = LOCATIONS.find((l) => l.id === id)
        if (!loc) return
        // menús/precios distintos por sucursal: vaciar carrito al cambiar
        if (prev && prev !== id) useCart.getState().clear()
        set({
          selectedId: id,
          cityId: loc.city,
          gateOpen: false,
          gateStep: 'city',
        })
      },
      setSuggestedCity: (c) => set({ suggestedCity: c }),
      openPicker: () => set({ gateOpen: true, gateStep: 'city' }),
      closePicker: () => {
        // solo se puede cerrar si ya hay sucursal elegida
        if (get().selectedId) set({ gateOpen: false, gateStep: 'city' })
      },
    }),
    {
      name: 'dushi-location',
      partialize: (s) => ({ cityId: s.cityId, selectedId: s.selectedId }),
      onRehydrateStorage: () => (state) => {
        // si ya había sucursal guardada, no mostrar gate
        if (state?.selectedId) state.gateOpen = false
      },
    },
  ),
)

const FALLBACK = LOCATIONS[0]

export function useSelectedLocation(): Location {
  const id = useLocation((s) => s.selectedId)
  return LOCATIONS.find((l) => l.id === id) ?? FALLBACK
}

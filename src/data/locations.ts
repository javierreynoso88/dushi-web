export type CityId = 'veracruz' | 'monterrey'

// Horario por día: 0=Dom … 6=Sáb. null = cerrado.
export type DayHours = { open: string; close: string } | null

export type Location = {
  id: string
  city: CityId
  cityLabel: string
  name: string
  emoji: string
  address: string
  contactPhone?: string // teléfono de contacto (display)
  hoursLabel: string
  schedule: DayHours[] // índice = getDay() (0 Dom … 6 Sáb)
  whatsapp: string
  phone: string // WhatsApp pedidos, internacional sin +
  maps: string
  menuId: string
  delivery: {
    uberEats?: string
    rappi?: string
    didiFood?: string
  }
}

// L–J 13:00–20:30 · V–D 13:00–21:30
const SCHED_STD: DayHours[] = [
  { open: '13:00', close: '21:30' }, // Dom
  { open: '13:00', close: '20:30' }, // Lun
  { open: '13:00', close: '20:30' }, // Mar
  { open: '13:00', close: '20:30' }, // Mié
  { open: '13:00', close: '20:30' }, // Jue
  { open: '13:00', close: '21:30' }, // Vie
  { open: '13:00', close: '21:30' }, // Sáb
]

// L–D 13:00–21:30
const SCHED_MARTI: DayHours[] = Array(7).fill({ open: '13:00', close: '21:30' })

// Monterrey: LUNES CERRADO · M–J 13:00–20:30 · V–D 13:00–21:30
const SCHED_MTY: DayHours[] = [
  { open: '13:00', close: '21:30' }, // Dom
  null, // Lun cerrado
  { open: '13:00', close: '20:30' }, // Mar
  { open: '13:00', close: '20:30' }, // Mié
  { open: '13:00', close: '20:30' }, // Jue
  { open: '13:00', close: '21:30' }, // Vie
  { open: '13:00', close: '21:30' }, // Sáb
]

export const CITIES: { id: CityId; label: string; emoji: string }[] = [
  { id: 'veracruz', label: 'Veracruz', emoji: '🌊' },
  { id: 'monterrey', label: 'Monterrey', emoji: '🏔️' },
]

// Pedidos WhatsApp: Veracruz → 229 927 5377 · Monterrey → 81 1306 3020
const WA_VER = '522299275377'
const WA_MTY = '528113063020'

export const LOCATIONS: Location[] = [
  {
    id: 'ver-americas',
    city: 'veracruz',
    cityLabel: 'Veracruz',
    name: 'Plaza Américas',
    emoji: '⛩️',
    address:
      'Bv. Adolfo Ruíz Cortines 3495, Int. 8B, 94299 Veracruz, Ver. — Comedores de Plaza Las Américas.',
    hoursLabel: 'L–J 1:00–8:30 pm · V–D 1:00–9:30 pm',
    schedule: SCHED_STD,
    whatsapp: `https://wa.me/${WA_VER}`,
    phone: WA_VER,
    maps: 'https://maps.google.com/?q=Dushi+Plaza+Las+Americas+Veracruz',
    menuId: 'plaza-americas',
    delivery: { uberEats: '#', rappi: '#', didiFood: '#' },
  },
  {
    id: 'ver-marti',
    city: 'veracruz',
    cityLabel: 'Veracruz',
    name: 'Martí',
    emoji: '🎏',
    address:
      'José Martí esq. Juan de Zumárraga 740, Reforma, 91919 Veracruz, Ver.',
    contactPhone: '229 591 5092',
    hoursLabel: 'L–D 1:00–9:30 pm',
    schedule: SCHED_MARTI,
    whatsapp: `https://wa.me/${WA_VER}`,
    phone: WA_VER,
    maps: 'https://maps.google.com/?q=Dushi+Jose+Marti+740+Reforma+Veracruz',
    menuId: 'marti',
    delivery: { uberEats: '#', rappi: '#', didiFood: '#' },
  },
  {
    id: 'ver-cuauhtemoc',
    city: 'veracruz',
    cityLabel: 'Veracruz',
    name: 'Cuauhtémoc',
    emoji: '🐉',
    address:
      'Av. Cuauhtémoc esq. C. Hernán Cortés 3347, Centro, 91700 Veracruz, Ver.',
    contactPhone: '229 375 1792',
    hoursLabel: 'L–J 1:00–8:30 pm · V–D 1:00–9:30 pm',
    schedule: SCHED_STD,
    whatsapp: `https://wa.me/${WA_VER}`,
    phone: WA_VER,
    maps: 'https://maps.google.com/?q=Dushi+Cuauhtemoc+Hernan+Cortes+Veracruz',
    menuId: 'cuauhtemoc',
    delivery: { uberEats: '#', rappi: '#', didiFood: '#' },
  },
  {
    id: 'mty-annya',
    city: 'monterrey',
    cityLabel: 'Monterrey',
    name: 'Plaza Annya',
    emoji: '🍣',
    address:
      'Av. Puerta de Hierro 8993, Loc. 40, Plaza Annya, Cumbres Madeira, 64345 Monterrey, N.L.',
    contactPhone: '81 1306 3020',
    hoursLabel: 'Lun cerrado · M–J 1:00–8:30 pm · V–D 1:00–9:30 pm',
    schedule: SCHED_MTY,
    whatsapp: `https://wa.me/${WA_MTY}`,
    phone: WA_MTY,
    maps: 'https://maps.google.com/?q=Dushi+Plaza+Annya+Puerta+de+Hierro+8993+Monterrey',
    menuId: 'monterrey',
    delivery: { uberEats: '#', rappi: '#', didiFood: '#' },
  },
]

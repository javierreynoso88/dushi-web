import type { Location } from '@/data/locations'

// Hora actual en zona México (ambas ciudades usan America/Mexico_City)
export function nowInMx(): { day: number; minutes: number; dateStr: string } {
  const now = new Date()
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Mexico_City',
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(now)
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? ''
  const dayMap: Record<string, number> = {
    Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
  }
  const day = dayMap[get('weekday')] ?? 0
  const minutes = Number(get('hour')) * 60 + Number(get('minute'))
  const dateStr = `${get('year')}-${get('month')}-${get('day')}`
  return { day, minutes, dateStr }
}

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export function isOpen(loc: Location): boolean {
  const { day, minutes } = nowInMx()
  const sched = loc.schedule[day]
  if (!sched) return false
  return minutes >= toMin(sched.open) && minutes <= toMin(sched.close)
}

export function todayHours(loc: Location): string {
  const { day } = nowInMx()
  const sched = loc.schedule[day]
  if (!sched) return 'Cerrado hoy'
  const fmt = (t: string) => {
    const [h, m] = t.split(':').map(Number)
    const h12 = h > 12 ? h - 12 : h
    return `${h12}:${String(m).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`
  }
  return `Hoy: ${fmt(sched.open)} – ${fmt(sched.close)}`
}

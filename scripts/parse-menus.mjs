// Convierte los menús Markdown de content/ en src/data/menus.ts
// Uso: node scripts/parse-menus.mjs
import { readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')

const FILES = [
  { file: 'Menu_Dushi_Plaza_Americas.md', menuId: 'plaza-americas' },
  { file: 'Menu_Dushi_Cuauhtemoc.md', menuId: 'cuauhtemoc' },
  { file: 'Menu_Dushi_Marti.md', menuId: 'marti' },
  { file: 'Menu_Dushi_Monterrey.md', menuId: 'monterrey' },
]

// Categorías excluidas del pedido a domicilio, por menú
const EXCLUDE = {
  monterrey: ['Dushi Boat — $499', 'Infantiles'],
}

const slug = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')

const normName = (s) => slug(s).replace(/-/g, ' ')

// Foto real por palabra clave en el nombre (archivos en public/menu/)
const IMG_BY_NAME = [
  ['philadelphia', 'd21.jpg'],
  ['sushimania', 'd26.jpg'],
  ['maravilla', 'd30.jpg'],
  ['eclipse', 'd31.jpg'],
  ['hawaiano', 'd34.jpg'],
  ['kiobo', 'd35.jpg'],
  ['salmon crunch', 'd37.jpg'],
  ['hamachi crunch', 'd37.jpg'],
  ['mango roll', 'd39.jpg'],
  ['arcoiris', 'd22.jpg'],
  ['favorito', 'd33.jpg'],
  ['dragon', 'd29.jpg'],
  ['doragon', 'd30.jpg'],
  ['dagon', 'd30.jpg'],
  ['mar y tierra', 'd32.jpg'],
  ['marinero', 'd37.jpg'],
  ['crazy', 'd34.jpg'],
  ['rainbow', 'd39.jpg'],
  ['viper', 'd29.jpg'],
  ['chirashi', 'd36.jpg'],
  ['mexicanito', 'd38.jpg'],
  ['okinawa', 'd28.jpg'],
  ['tori age', 'd12.jpg'],
  ['alaska', 'd31.jpg'],
  ['dorado', 'd38.jpg'],
  ['sirenito', 'd38.jpg'],
  ['tempura roll', 'd28.jpg'],
  ['gyoza', 'd06.jpg'],
  ['edamame', 'd05.jpg'],
  ['sunomono', 'd07.jpg'],
  ['yaki sake', 'd04.jpg'],
  ['yaki ebi', 'd12.jpg'],
  ['natsu ebi', 'd12.jpg'],
  ['baby squid', 'd09.jpg'],
  ['ramen', 'd02.jpg'],
  ['udon', 'd02.jpg'],
  ['misoshiro', 'd02.jpg'],
  ['sumashi', 'd02.jpg'],
  ['zosui', 'd02.jpg'],
  ['sopa', 'd02.jpg'],
  ['gohan', 'd03.jpg'],
  ['yakimeshi', 'd03.jpg'],
  ['tempura helado', 'd40.jpg'],
  ['kurowassan', 'd40.jpg'],
  ['kakuma', 'd40.jpg'],
  ['tempura', 'd14.jpg'],
  ['teppanyaki', 'd16.jpg'],
  ['kushiage', 'd09.jpg'],
  ['yakitori', 'd16.jpg'],
  ['sashimi', 'd20.jpg'],
  ['suzuki', 'd20.jpg'],
  ['maguro', 'd20.jpg'],
  ['sake kunsei', 'd20.jpg'],
  ['nigiri', 'd20.jpg'],
  ['samurai', 'd20.jpg'],
  ['temaki', 'd23.jpg'],
  ['donburi', 'd03.jpg'],
  ['dushi ball', 'd19.jpg'],
  ['nenito', 'd18.jpg'],
  ['polliball', 'd18.jpg'],
  ['dushi baby', 'd18.jpg'],
  ['limonada', 'd42.jpg'],
  ['calpis', 'd44.jpg'],
  ['agua', 'd43.jpg'],
  ['refresco', 'd43.jpg'],
  ['pasta', 'd13.jpg'],
  ['camarones empanizados', 'd15.jpg'],
  ['ebi fry', 'd15.jpg'],
  ['roca', 'd17.jpg'],
  ['tori fry', 'd12.jpg'],
  ['sakana fry', 'd12.jpg'],
  ['pescado empanizado', 'd12.jpg'],
  ['futomaki', 'd27.jpg'],
  ['california', 'd04.jpg'],
  ['kabuki', 'd29.jpg'],
  ['kiuri', 'd32.jpg'],
  ['tampico', 'd24.jpg'],
  ['avocado', 'd25.jpg'],
  ['aguacate roll', 'd25.jpg'],
  ['cheese', 'd28.jpg'],
  ['queso roll', 'd24.jpg'],
  ['tropibanana', 'd28.jpg'],
  ['shake roll', 'd26.jpg'],
  ['salmon zuke', 'd21.jpg'],
  ['salmon roll', 'd21.jpg'],
  ['tori roll', 'd33.jpg'],
  ['tuna', 'd35.jpg'],
  ['kara', 'd35.jpg'],
  ['unagui', 'd36.jpg'],
  ['jaiba', 'd37.jpg'],
  ['ebi maki', 'd33.jpg'],
  ['dushi roll', 'd29.jpg'],
  ['dushi box', 'd41.jpg'],
  ['hot box', 'd38.jpg'],
  ['mix box', 'd41.jpg'],
  ['poke', 'd03.jpg'],
  ['ensalada', 'd07.jpg'],
  ['tropical', 'd07.jpg'],
  ['tori yasai', 'd07.jpg'],
  ['sendo', 'd07.jpg'],
  ['tropi', 'd17.jpg'],
  ['rollo primavera', 'd08.jpg'],
  ['rollos primavera', 'd08.jpg'],
  ['extra', 'd43.jpg'],
]

// Fotos reales por platillo (public/platillos/<slug>.jpg)
import { readdirSync } from 'node:fs'
const PHOTO_SLUGS = readdirSync(join(ROOT, 'public/platillos'))
  .filter((f) => f.endsWith('.jpg'))
  .map((f) => f.replace(/\.jpg$/, ''))
  .sort((a, b) => b.length - a.length) // más específico primero

const STOP = new Set(['de', 'la', 'el', 'del', 'con', 'al', 'a', 'y', 'o'])
const tokens = (s) =>
  normName(s)
    .split(' ')
    .filter((t) => t && !STOP.has(t))
const tokEq = (a, b) =>
  a === b || a === b + 's' || b === a + 's' || a === b + 'es' || b === a + 'es'

const PHOTO_TOKENS = PHOTO_SLUGS.map((s) => ({
  slug: s,
  toks: tokens(s.replace(/-/g, ' ')),
}))

// Foto cuyo nombre (todos sus tokens) esté contenido en el nombre del platillo.
// Tolera plural/singular y palabras vacías. Gana la foto con más tokens.
const photoFor = (name, catName = '') => {
  const tryToks = (itemToks) => {
    let best = null
    for (const p of PHOTO_TOKENS) {
      if (p.toks.length === 0) continue
      const ok = p.toks.every((pt) => itemToks.some((it) => tokEq(pt, it)))
      if (ok && (!best || p.toks.length > best.toks.length)) best = p
    }
    return best
  }
  // 1) tokens de la foto ⊆ nombre del platillo
  let best = tryToks(tokens(name))
  // 2) con contexto de categoría ("Gohan" + "Blanco" → Gohan Blanco)
  if (!best && catName) best = tryToks(tokens(catName + ' ' + name))
  // 3) inverso: nombre del platillo ⊆ nombre de la foto (elige la más corta)
  if (!best) {
    const itemToks = tokens(name)
    if (itemToks.length > 0) {
      let inv = null
      for (const p of PHOTO_TOKENS) {
        const ok = itemToks.every((it) => p.toks.some((pt) => tokEq(pt, it)))
        if (ok && (!inv || p.toks.length < inv.toks.length)) inv = p
      }
      best = inv
    }
  }
  return best ? `/platillos/${best.slug}.jpg` : null
}

const imageFor = (name) => {
  const real = photoFor(name)
  if (real) return real
  const n = normName(name)
  for (const [k, img] of IMG_BY_NAME) if (n.includes(k)) return `/menu/${img}`
  return '/menu/d01.jpg'
}

const tagsFor = (name, desc) => {
  const t = []
  const all = normName(name + ' ' + desc)
  if (/vegetarian/.test(all)) t.push('veggie')
  if (/spicy|picante|togarashi|sriracha|habanero/.test(all)) t.push('picante')
  return t
}

function parseMenu(md, menuId) {
  const lines = md.split('\n')
  const cats = [] // {name, items:[]}
  let h2 = '',
    h3 = '',
    h4 = ''
  let intro = '' // párrafo antes de una tabla
  let tableHeaders = null
  let lastTableHeaders = null
  let skipCat = false
  const excluded = EXCLUDE[menuId] || []

  const catName = () => h3 || h2
  const getCat = () => {
    const name = catName()
    let c = cats.find((x) => x.name === name)
    if (!c) {
      c = { name, items: [] }
      cats.push(c)
    }
    return c
  }

  const push = (item) => {
    if (skipCat) return
    getCat().items.push(item)
  }

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    const l = line.trim()

    const h = l.match(/^(#{1,4})\s+(.*)/)
    if (h) {
      const level = h[1].length
      const text = h[2].trim()
      if (level <= 2) {
        h2 = text
        h3 = ''
        h4 = ''
      } else if (level === 3) {
        h3 = text
        h4 = ''
      } else {
        h4 = text
      }
      intro = ''
      tableHeaders = null
      skipCat = excluded.some((e) => text.startsWith(e.split(' — ')[0]))
      // Caso especial: heading con precio (## Poke Bowl — $199, ## Dushi Box — 50 piezas — $499)
      const hp = text.match(/^(.*?)(?:\s+—\s+(\d+\s*piezas))?\s+—\s+\$(\d+)$/)
      if (hp && level >= 2 && !skipCat) {
        // producto único; descripción = líneas hasta siguiente heading (resumida)
        const name = hp[1].trim()
        const pieces = hp[2] || undefined
        const price = Number(hp[3])
        // junta bullets siguientes como descripción corta
        const parts = []
        for (let j = i + 1; j < lines.length && !/^#{1,4}\s/.test(lines[j]); j++) {
          const b = lines[j].trim().match(/^-\s+\*?\*?(.+?)\*?\*?:?\s*(.*)$/)
          if (b) parts.push(b[1].replace(/\*/g, ''))
          if (parts.length >= 6) break
        }
        let description = parts.length
          ? `Incluye: ${parts.join(', ')}.`
          : 'Consulta los detalles al ordenar.'
        if (/poke/i.test(name))
          description =
            'Arma tu poke: elige base, proteína (100 g), 3 ingredientes, aderezos y topping. Indica tu combinación al enviar el pedido.'
        push({
          id: `${slug(name)}`,
          name,
          description,
          pieces,
          price,
          image: imageFor(name),
          tags: tagsFor(name, description),
        })
        // marca la categoría para no re-procesar bullets internos
        skipCat = true
      }
      continue
    }

    // item bullet: - **Nombre — $precio**
    const b = l.match(/^-\s+\*\*(.+?)\s+—\s+\$(\d+)\*\*/)
    if (b) {
      const name = b[1].trim()
      const price = Number(b[2])
      // descripción: siguiente línea de texto
      let desc = ''
      for (let j = i + 1; j < lines.length; j++) {
        const t = lines[j].trim()
        if (!t) {
          if (desc) break
          continue
        }
        if (/^[-#>|]/.test(t)) break
        desc += (desc ? ' ' : '') + t
      }
      desc = desc.replace(/\*\*/g, '').replace(/\s+/g, ' ').trim()
      // porción entre paréntesis al final de la descripción
      let pieces
      const pm = desc.match(/\(([^()]*(?:pieza|pzas?|g|ml|litro)[^()]*)\)\.?$/i)
      if (pm) pieces = pm[1]
      push({
        id: slug(name),
        name,
        description: desc,
        pieces,
        price,
        image: imageFor(name),
        tags: tagsFor(name, desc),
      })
      continue
    }

    // tabla
    if (l.startsWith('|')) {
      const cells = l
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim())
      if (cells.every((c) => /^:?-+:?$/.test(c))) continue // separador
      const isHeader = !cells.some((c) => /\$\d+/.test(c))
      if (isHeader) {
        tableHeaders = cells
        lastTableHeaders = cells
        continue
      }
      const headers = tableHeaders || lastTableHeaders
      if (!headers) continue
      const label = cells[0]
      // localizar columnas de precio
      const base = h4 || h3 || h2
      const baseIsGeneric = /^(sashimi|kushiages?|yakitori|bebidas|extras?|yakimeshi|teppanyaki|gohan|nigiris?)/i.test(
        base,
      )
      const clean = (s) => s.replace(/\*\*/g, '').trim()
      let pieces
      const portionIdx = headers.findIndex((c) => /porci/i.test(c))
      if (portionIdx > 0 && cells[portionIdx] && cells[portionIdx] !== '—')
        pieces = cells[portionIdx]
      const priceCols = []
      headers.forEach((hd, idx) => {
        if (idx === 0 || idx === portionIdx) return
        priceCols.push(idx)
      })
      const validPrices = priceCols.filter(
        (idx) => cells[idx] && /\$\d+/.test(cells[idx]),
      )
      for (const idx of validPrices) {
        const price = Number(cells[idx].match(/\$(\d+)/)[1])
        const colName = headers[idx]
        const multi = validPrices.length > 1
        let baseName = baseIsGeneric
          ? `${base.replace(/s$/i, '')}: ${clean(label)}`
          : `${base} — ${clean(label)}`
        if (/^(bebidas|extras?)/i.test(base)) baseName = clean(label)
        const name = multi ? `${baseName} (${clean(colName)})` : baseName
        push({
          id: slug(name),
          name,
          description: intro || `${base} — ${clean(label)}.`,
          pieces: multi ? clean(colName) : pieces,
          price,
          image: imageFor(base + ' ' + label),
          tags: tagsFor(name, intro),
        })
      }
      continue
    }

    // párrafo (posible intro de tabla)
    if (l && !l.startsWith('>') && !l.startsWith('---') && !l.startsWith('#')) {
      if (!l.startsWith('-')) intro = l.replace(/\*\*/g, '')
    }
    if (!l) {
      /* keep intro until next heading/table */
    }
  }

  // limpia categorías vacías y nombres
  return cats
    .filter((c) => c.items.length > 0)
    .map((c) => ({
      id: slug(c.name),
      name: c.name.replace(/\s+—\s+\$\d+$/, ''),
      tagline: '',
      items: c.items,
    }))
}

// ——— Anexos exclusivos Veracruz: Dushi Box (promo fija) + Extras ———
const VER_IDS = ['plaza-americas', 'cuauhtemoc', 'marti']

const BOX_NOTE =
  'Promoción solo a domicilio o para llevar; requiere tiempo mínimo de preparación. No se permiten cambios en los rollos. Hasta agotar existencias.'

const VER_BOXES = {
  id: 'dushi-box',
  name: 'Dushi Box',
  tagline: 'Promociones para compartir — no admiten cambios',
  items: [
    {
      id: 'dushi-box-50',
      name: 'Dushi Box',
      description: `5 rollos de la casa: Ebi Maki, Hawaiano, Kiobo Roll, Salmón Crunch y Cheese Roll. ${BOX_NOTE}`,
      pieces: '50 pzas',
      price: 419,
      image: '/menu/d41.jpg',
      tags: ['favorito'],
    },
    {
      id: 'dushi-box-jumbo',
      name: 'Dushi Box Jumbo',
      description: `6 rollos: Dushi Roll, Marinero, Salmón Crunch, Eclipse, Kara Maki y Tropibanana. ${BOX_NOTE}`,
      pieces: '60 pzas',
      price: 489,
      image: '/menu/d41.jpg',
      tags: [],
    },
    {
      id: 'dushi-box-especial',
      name: 'Dushi Box Especial',
      description: `Dushi Roll, Ebi Maki, Arcoíris y Philadelphia (5 pzas c/u), Mini Dushi Ball (6 pzas), rollos primavera (3 pzas), tiras de pollo capeado (6 pzas) y verdura tempura. ${BOX_NOTE}`,
      price: 499,
      image: '/menu/d41.jpg',
      tags: ['nuevo'],
    },
  ],
}

// Extras como productos individuales (mismo catálogo que el configurador)
const VER_EXTRAS = {
  id: 'extras',
  name: 'Extras',
  tagline: 'Salsas y complementos',
  items: [
    ['Salsa de soya', '45 ml', 10],
    ['Chiles toreados', '5 g', 5],
    ['Aderezo chipotle', '45 ml', 10],
    ['Salsa de anguila', '45 ml', 20],
    ['Sriracha', '25 ml', 10],
    ['Tonkatsu', '45 ml', 15],
    ['Salsa teriyaki', '45 ml', 15],
    ['Aderezo Tampico', '60 g', 25],
    ['Salsa mayo', '45 ml', 10],
    ['Salsa de mango', '45 ml', 15],
    ['Salsa tempura', '45 ml', 20],
    ['Ajo macho', '10 g', 20],
  ].map(([name, portion, price]) => ({
    id: slug(name),
    name,
    description: `Porción de ${portion}.`,
    pieces: portion,
    price,
    image: '/menu/d43.jpg',
    tags: [],
  })),
}

function appendVeracruzAnexos(cats) {
  const bebidasIdx = cats.findIndex((c) => /bebidas/i.test(c.name))
  const insertAt = bebidasIdx < 0 ? cats.length : bebidasIdx
  cats.splice(insertAt, 0, VER_BOXES)
  cats.push(VER_EXTRAS)
  return cats
}

const out = {}
for (const { file, menuId } of FILES) {
  const md = readFileSync(join(ROOT, 'content', file), 'utf8')
  out[menuId] = parseMenu(md, menuId)
  if (VER_IDS.includes(menuId)) appendVeracruzAnexos(out[menuId])
}

// Sección "Extras" disponible en todos los menús (fuente: tabla Extras del menú Monterrey)
const extrasCat = out['monterrey']?.find((c) => c.id === 'extras')
if (extrasCat) {
  for (const menuId of Object.keys(out)) {
    if (!out[menuId].some((c) => c.id === 'extras')) {
      out[menuId].push(JSON.parse(JSON.stringify(extrasCat)))
    }
  }
}

// Pase final: re-mapea TODAS las imágenes con la foto real si existe
// (cubre también anexos con imagen fija)
for (const menuId of Object.keys(out)) {
  for (const cat of out[menuId]) {
    for (const item of cat.items) {
      const real = photoFor(item.name, cat.name)
      if (real) item.image = real
    }
  }
}

for (const menuId of Object.keys(out)) {
  const n = out[menuId].reduce((s, c) => s + c.items.length, 0)
  const real = out[menuId].reduce(
    (s, c) =>
      s + c.items.filter((i) => i.image.startsWith('/platillos/')).length,
    0,
  )
  console.log(menuId, '→', out[menuId].length, 'cat,', n, 'platillos,', real, 'foto real')
}

const ts = `// ARCHIVO GENERADO — no editar a mano.
// Fuente: content/*.md · Regenerar con: node scripts/parse-menus.mjs
import type { Category } from './menu'

export const MENUS: Record<string, Category[]> = ${JSON.stringify(out, null, 2)}
`
writeFileSync(join(ROOT, 'src/data/menus.ts'), ts)
console.log('src/data/menus.ts escrito')

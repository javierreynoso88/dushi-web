// Extras configurables por platillo (fuente: content/menu_extras_dushi.md)
export type ExtraDef = {
  id: string
  name: string
  portion?: string
  price: number
}

export const EMPANIZADO_ID = 'empanizado'

export const EXTRAS: ExtraDef[] = [
  { id: 'salsa-soya', name: 'Salsa de soya', portion: '45 ml', price: 10 },
  { id: 'chiles-toreados', name: 'Chiles toreados', portion: '5 g', price: 5 },
  { id: 'aderezo-chipotle', name: 'Aderezo chipotle', portion: '45 ml', price: 10 },
  { id: 'salsa-anguila', name: 'Salsa de anguila', portion: '45 ml', price: 20 },
  { id: 'sriracha', name: 'Sriracha', portion: '25 ml', price: 10 },
  { id: 'tonkatsu', name: 'Tonkatsu', portion: '45 ml', price: 15 },
  { id: 'salsa-teriyaki', name: 'Salsa teriyaki', portion: '45 ml', price: 15 },
  { id: 'aderezo-tampico', name: 'Aderezo Tampico', portion: '60 g', price: 25 },
  { id: 'salsa-mayo', name: 'Salsa mayo', portion: '45 ml', price: 10 },
  { id: 'salsa-mango', name: 'Salsa de mango', portion: '45 ml', price: 15 },
  { id: 'salsa-tempura', name: 'Salsa tempura', portion: '45 ml', price: 20 },
  { id: 'ajo-macho', name: 'Ajo macho', portion: '10 g', price: 20 },
  { id: EMPANIZADO_ID, name: 'Empanizado', price: 20 },
]

export const EMPANIZADO_LEGEND =
  'Para lograr el empanizado, el rollo puede sufrir cambios en su forma de preparación.'

// Reglas de categoría
export const isBebidaCategory = (cat: string) => /bebida/i.test(cat)
export const isBoxCategory = (cat: string) => /box/i.test(cat)
export const isExtrasCategory = (cat: string) => /^extras?$/i.test(cat.trim())
export const isRollCategory = (cat: string) =>
  /rollo/i.test(cat) || /sugerencias del chef/i.test(cat)
// extras aplican a toda la comida; NO a bebidas, boxes (promo fija) ni a los extras mismos
export const allowsExtras = (cat: string) =>
  !isBebidaCategory(cat) && !isBoxCategory(cat) && !isExtrasCategory(cat)

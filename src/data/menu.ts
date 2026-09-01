export type Product = {
  id: string
  name: string
  description: string
  pieces?: string
  price: number
  from?: boolean // muestra "desde $X"
  priceNote?: string
  image: string
  tags?: ('nuevo' | 'picante' | 'favorito' | 'veggie')[]
}

export type Category = {
  id: string
  name: string
  tagline: string
  items: Product[]
}

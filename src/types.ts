export const categories = [
  { id: 'lighting', label: 'Lighting' },
  { id: 'textiles', label: 'Textiles' },
  { id: 'tableware', label: 'Tableware' },
  { id: 'objects', label: 'Objects' },
] as const

export type CategoryId = (typeof categories)[number]['id']

export type ProductColor = {
  id: string
  name: string
  hex: string
}

export type Product = {
  id: string
  slug: string
  title: string
  sellingPoint: string
  description: string
  category: CategoryId
  price: number
  originalPrice: number
  image: string
  material: string
  colors: ProductColor[]
  featured: boolean
}

export type CartLine = {
  productId: string
  colorId: string
  qty: number
}

export type Address = {
  id: string
  name: string
  line1: string
  city: string
  region: string
  postalCode: string
  country: string
}

export type PlacedOrder = {
  id: string
  email: string
  name: string
  total: number
  subtotal: number
  shipping: number
  address: Address
  lines: {
    title: string
    color: string
    qty: number
    price: number
  }[]
}

import { createContext, use } from 'react'
import type { Address, CartLine } from '../types.ts'

export type ShopState = {
  cart: CartLine[]
  savedIds: string[]
  address: Address
  addresses: Address[]
  subtotal: number
  shipping: number
  total: number
  cartCount: number
  drawerOpen: boolean
  notice: string | null
  openDrawer: () => void
  closeDrawer: () => void
  dismissNotice: () => void
  setAddressId: (id: string) => void
  isSaved: (productId: string) => boolean
  toggleSaved: (productId: string) => void
  addToCart: (productId: string, colorId: string, qty?: number) => void
  setQty: (productId: string, colorId: string, qty: number) => void
  removeLine: (productId: string, colorId: string) => void
  clearCart: () => void
}

export const ShopStateContext = createContext<ShopState | null>(null)

export function useShop() {
  const value = use(ShopStateContext)
  if (!value) throw new Error('useShop must be used within ShopProvider')
  return value
}

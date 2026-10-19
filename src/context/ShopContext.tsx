import { useCallback, useMemo, useRef, useState, type ReactNode } from 'react'
import { addresses } from '../data/catalog.ts'
import { cartSubtotal, shippingFor } from '../lib/cart.ts'
import type { CartLine } from '../types.ts'
import { ShopStateContext, type ShopState } from './shop-state.ts'

const CART_KEY = 'halden-cart'
const SAVED_KEY = 'halden-saved'
const ADDRESS_KEY = 'halden-address'

function readCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(CART_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter((line): line is CartLine => {
      if (!line || typeof line !== 'object') return false
      const candidate = line as CartLine
      return (
        typeof candidate.productId === 'string' &&
        typeof candidate.colorId === 'string' &&
        typeof candidate.qty === 'number' &&
        candidate.qty > 0
      )
    })
  } catch {
    return []
  }
}

function readSaved(): string[] {
  try {
    const raw = localStorage.getItem(SAVED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
  } catch {
    return []
  }
}

function readAddressId() {
  try {
    const stored = localStorage.getItem(ADDRESS_KEY)
    return addresses.some((address) => address.id === stored) && stored ? stored : addresses[0].id
  } catch {
    return addresses[0].id
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode */
  }
}

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>(readCart)
  const [savedIds, setSavedIds] = useState<string[]>(readSaved)
  const [addressId, setAddressIdState] = useState(readAddressId)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [notice, setNotice] = useState<string | null>(null)
  const noticeTimer = useRef<number | null>(null)

  const address = addresses.find((item) => item.id === addressId) ?? addresses[0]
  const subtotal = cartSubtotal(cart)
  const shipping = shippingFor(subtotal)

  const showNotice = useCallback((message: string) => {
    setNotice(message)
    if (noticeTimer.current) window.clearTimeout(noticeTimer.current)
    noticeTimer.current = window.setTimeout(() => setNotice(null), 2400)
  }, [])

  const addToCart = useCallback(
    (productId: string, colorId: string, qty = 1) => {
      setCart((current) => {
        const next = current.some((line) => line.productId === productId && line.colorId === colorId)
          ? current.map((line) =>
              line.productId === productId && line.colorId === colorId
                ? { ...line, qty: line.qty + qty }
                : line,
            )
          : [...current, { productId, colorId, qty }]
        write(CART_KEY, next)
        return next
      })
      showNotice('Added to cart')
    },
    [showNotice],
  )

  const setQty = useCallback((productId: string, colorId: string, qty: number) => {
    setCart((current) => {
      const next =
        qty < 1
          ? current.filter((line) => !(line.productId === productId && line.colorId === colorId))
          : current.map((line) =>
              line.productId === productId && line.colorId === colorId ? { ...line, qty } : line,
            )
      write(CART_KEY, next)
      return next
    })
  }, [])

  const removeLine = useCallback((productId: string, colorId: string) => {
    setCart((current) => {
      const next = current.filter((line) => !(line.productId === productId && line.colorId === colorId))
      write(CART_KEY, next)
      return next
    })
  }, [])

  const clearCart = useCallback(() => {
    setCart([])
    write(CART_KEY, [])
  }, [])

  const toggleSaved = useCallback((productId: string) => {
    setSavedIds((current) => {
      const next = current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
      write(SAVED_KEY, next)
      return next
    })
  }, [])

  const setAddressId = useCallback((id: string) => {
    setAddressIdState(id)
    try {
      localStorage.setItem(ADDRESS_KEY, id)
    } catch {
      /* private mode */
    }
  }, [])

  const openDrawer = useCallback(() => setDrawerOpen(true), [])
  const closeDrawer = useCallback(() => setDrawerOpen(false), [])
  const dismissNotice = useCallback(() => setNotice(null), [])

  const api = useMemo<ShopState>(
    () => ({
      cart,
      savedIds,
      address,
      addresses,
      subtotal,
      shipping,
      total: subtotal + shipping,
      cartCount: cart.reduce((sum, line) => sum + line.qty, 0),
      drawerOpen,
      notice,
      openDrawer,
      closeDrawer,
      dismissNotice,
      setAddressId,
      isSaved: (productId: string) => savedIds.includes(productId),
      toggleSaved,
      addToCart,
      setQty,
      removeLine,
      clearCart,
    }),
    [
      addToCart,
      address,
      cart,
      clearCart,
      closeDrawer,
      dismissNotice,
      drawerOpen,
      notice,
      openDrawer,
      removeLine,
      savedIds,
      setAddressId,
      setQty,
      shipping,
      subtotal,
      toggleSaved,
    ],
  )

  return <ShopStateContext value={api}>{children}</ShopStateContext>
}

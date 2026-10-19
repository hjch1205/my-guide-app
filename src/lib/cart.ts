import { getColor, getProduct, SHIPPING_FEE, FREE_SHIPPING_AT } from '../data/catalog.ts'
import type { CartLine } from '../types.ts'

export function resolveCart(cart: CartLine[]) {
  return cart.flatMap((line) => {
    const product = getProduct(line.productId)
    if (!product) return []
    const color = getColor(product, line.colorId)
    return [
      {
        ...line,
        product,
        color,
        lineTotal: product.price * line.qty,
      },
    ]
  })
}

export function cartSubtotal(cart: CartLine[]) {
  return resolveCart(cart).reduce((sum, line) => sum + line.lineTotal, 0)
}

export function shippingFor(subtotal: number) {
  if (subtotal <= 0) return 0
  return subtotal >= FREE_SHIPPING_AT ? 0 : SHIPPING_FEE
}

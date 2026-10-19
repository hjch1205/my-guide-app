import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FREE_SHIPPING_AT } from '../data/catalog.ts'
import { useShop } from '../context/shop-state.ts'
import { resolveCart } from '../lib/cart.ts'
import { formatPrice } from '../lib/money.ts'
import { CloseIcon } from './Icons.tsx'

export function CartDrawer() {
  const shop = useShop()
  const closeRef = useRef<HTMLButtonElement>(null)
  const lines = resolveCart(shop.cart)
  const remaining = FREE_SHIPPING_AT - shop.subtotal
  const { drawerOpen, closeDrawer } = shop

  useEffect(() => {
    if (!drawerOpen) return
    const previous = document.activeElement
    closeRef.current?.focus()
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') closeDrawer()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      if (previous instanceof HTMLElement) previous.focus()
    }
  }, [closeDrawer, drawerOpen])

  if (!shop.drawerOpen) return null

  return (
    <div className="drawer-root">
      <button type="button" className="drawer-scrim" aria-label="Close cart" onClick={shop.closeDrawer} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="drawer-head">
          <h2 id="cart-title">Cart</h2>
          <button ref={closeRef} type="button" className="icon-btn" aria-label="Close cart" onClick={shop.closeDrawer}>
            <CloseIcon />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="drawer-empty">
            <p>Your cart is empty.</p>
            <Link to="/shop" className="btn" onClick={shop.closeDrawer}>
              Browse the shop
            </Link>
          </div>
        ) : (
          <>
            <p className="ship-note">
              {remaining > 0
                ? `${formatPrice(remaining)} away from free shipping`
                : 'Shipping is free on this order'}
            </p>
            <ul className="drawer-lines">
              {lines.map((line) => (
                <li key={`${line.productId}-${line.colorId}`}>
                  <img src={line.product.image} alt="" />
                  <div>
                    <p className="line-title">{line.product.title}</p>
                    <p className="line-meta">
                      {line.color.name} · Qty {line.qty}
                    </p>
                    <p className="price-now">{formatPrice(line.lineTotal)}</p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="drawer-foot">
              <p>
                <span>Subtotal</span>
                <span className="price-now">{formatPrice(shop.subtotal)}</span>
              </p>
              <Link to="/cart" className="btn btn-secondary" onClick={shop.closeDrawer}>
                View cart
              </Link>
              <Link to="/checkout" className="btn" onClick={shop.closeDrawer}>
                Checkout
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

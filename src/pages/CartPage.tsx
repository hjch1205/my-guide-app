import { Link } from 'react-router-dom'
import { FREE_SHIPPING_AT } from '../data/catalog.ts'
import { useShop } from '../context/shop-state.ts'
import { resolveCart } from '../lib/cart.ts'
import { formatPrice } from '../lib/money.ts'

export function CartPage() {
  const shop = useShop()
  const lines = resolveCart(shop.cart)
  const remaining = FREE_SHIPPING_AT - shop.subtotal

  return (
    <div className="section cart-page">
      <div className="section-head">
        <h1>Cart</h1>
      </div>
      {lines.length === 0 ? (
        <div className="empty">
          <p>Nothing here yet.</p>
          <Link to="/shop" className="btn">
            Browse the shop
          </Link>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="cart-lines">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.colorId}`}>
                <Link to={`/product/${line.product.slug}`}>
                  <img src={line.product.image} alt="" />
                </Link>
                <div className="cart-line-copy">
                  <Link to={`/product/${line.product.slug}`}>{line.product.title}</Link>
                  <p className="line-meta">{line.color.name}</p>
                  <p className="card-prices">
                    <span className="price-now">{formatPrice(line.product.price)}</span>
                    <s className="price-was">{formatPrice(line.product.originalPrice)}</s>
                  </p>
                  <div className="line-controls">
                    <div className="stepper">
                      <button
                        type="button"
                        aria-label={`Decrease quantity of ${line.product.title}`}
                        onClick={() => shop.setQty(line.productId, line.colorId, line.qty - 1)}
                      >
                        −
                      </button>
                      <span>{line.qty}</span>
                      <button
                        type="button"
                        aria-label={`Increase quantity of ${line.product.title}`}
                        onClick={() => shop.setQty(line.productId, line.colorId, line.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button type="button" className="text-btn" onClick={() => shop.removeLine(line.productId, line.colorId)}>
                      Remove
                    </button>
                  </div>
                </div>
                <p className="line-total price-now">{formatPrice(line.lineTotal)}</p>
              </li>
            ))}
          </ul>
          <aside className="summary">
            <h2>Summary</h2>
            <p>
              <span>Subtotal</span>
              <span>{formatPrice(shop.subtotal)}</span>
            </p>
            <p>
              <span>Shipping to {shop.address.city}</span>
              <span>{shop.shipping === 0 ? 'Free' : formatPrice(shop.shipping)}</span>
            </p>
            <p className="ship-note">
              {remaining > 0 ? `${formatPrice(remaining)} away from free shipping` : 'Shipping is free on this order'}
            </p>
            <p className="summary-total">
              <span>Total</span>
              <span>{formatPrice(shop.total)}</span>
            </p>
            <Link to="/checkout" className="btn">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </div>
  )
}

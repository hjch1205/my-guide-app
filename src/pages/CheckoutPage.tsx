import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { shopper } from '../data/catalog.ts'
import { useShop } from '../context/shop-state.ts'
import { resolveCart } from '../lib/cart.ts'
import { formatPrice } from '../lib/money.ts'
import type { PlacedOrder } from '../types.ts'

const ORDER_KEY = 'halden-orders'

export function CheckoutPage() {
  const shop = useShop()
  const navigate = useNavigate()
  const lines = resolveCart(shop.cart)
  const [name, setName] = useState(shopper.name)
  const [email, setEmail] = useState(shopper.email)
  const [error, setError] = useState('')
  const [placed, setPlaced] = useState(false)

  if (lines.length === 0 && !placed) return <Navigate to="/cart" replace />

  function place(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (name.trim().length < 2) {
      setError('Enter the name for this delivery.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Enter an email for the receipt.')
      return
    }
    const order: PlacedOrder = {
      id: `HL-${Date.now().toString().slice(-6)}`,
      email: email.trim(),
      name: name.trim(),
      total: shop.total,
      subtotal: shop.subtotal,
      shipping: shop.shipping,
      address: shop.address,
      lines: lines.map((line) => ({
        title: line.product.title,
        color: line.color.name,
        qty: line.qty,
        price: line.lineTotal,
      })),
    }
    const existing = readOrders()
    sessionStorage.setItem(ORDER_KEY, JSON.stringify([order, ...existing]))
    setPlaced(true)
    shop.clearCart()
    navigate(`/order/${order.id}`)
  }

  return (
    <div className="section checkout">
      <div className="section-head">
        <h1>Checkout</h1>
      </div>
      <div className="cart-layout">
        <form className="checkout-form" onSubmit={place}>
          <p className="popover-note">This preview confirms the order on this device. No payment is taken.</p>
          <label>
            Full name
            <input value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" />
          </label>
          <label>
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" inputMode="email" />
          </label>
          <fieldset>
            <legend>Ship to</legend>
            <p>
              {shop.address.name}
              <br />
              {shop.address.line1}
              <br />
              {shop.address.city}, {shop.address.region} {shop.address.postalCode}
            </p>
            <p className="line-meta">Change the address from the pin in the header.</p>
          </fieldset>
          {error && <p className="form-error">{error}</p>}
          <button type="submit" className="btn">
            Place order · {formatPrice(shop.total)}
          </button>
        </form>
        <aside className="summary">
          <h2>Your order</h2>
          <ul className="summary-lines">
            {lines.map((line) => (
              <li key={`${line.productId}-${line.colorId}`}>
                <span>
                  {line.product.title} × {line.qty}
                </span>
                <span>{formatPrice(line.lineTotal)}</span>
              </li>
            ))}
          </ul>
          <p>
            <span>Shipping</span>
            <span>{shop.shipping === 0 ? 'Free' : formatPrice(shop.shipping)}</span>
          </p>
          <p className="summary-total">
            <span>Total</span>
            <span>{formatPrice(shop.total)}</span>
          </p>
          <Link to="/cart">Edit cart</Link>
        </aside>
      </div>
    </div>
  )
}

export function OrderPage() {
  const { orderId } = useParams()
  const order = readOrders().find((item) => item.id === orderId)

  if (!order) {
    return (
      <div className="section empty">
        <h1>No order on this device</h1>
        <Link to="/shop" className="btn">
          Back to the shop
        </Link>
      </div>
    )
  }

  return (
    <div className="section order">
      <p className="eyebrow">Order confirmed</p>
      <h1>{order.id}</h1>
      <p className="pdp-description">
        Thanks, {order.name.split(' ')[0]}. A receipt is ready for {order.email}. Nothing was charged.
      </p>
      <div className="summary order-summary">
        <p>
          {order.address.line1}
          <br />
          {order.address.city}, {order.address.region} {order.address.postalCode}
        </p>
        <ul className="summary-lines">
          {order.lines.map((line) => (
            <li key={`${line.title}-${line.color}`}>
              <span>
                {line.title} · {line.color} × {line.qty}
              </span>
              <span>{formatPrice(line.price)}</span>
            </li>
          ))}
        </ul>
        <p className="summary-total">
          <span>Total</span>
          <span>{formatPrice(order.total)}</span>
        </p>
      </div>
      <Link to="/shop" className="btn">
        Continue browsing
      </Link>
    </div>
  )
}

function readOrders(): PlacedOrder[] {
  try {
    const raw = sessionStorage.getItem(ORDER_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? (parsed as PlacedOrder[]) : []
  } catch {
    return []
  }
}

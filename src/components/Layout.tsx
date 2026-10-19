import { useEffect } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useShop } from '../context/shop-state.ts'
import { CartDrawer } from './CartDrawer.tsx'
import { Header } from './Header.tsx'

export function Layout() {
  const shop = useShop()

  useEffect(() => {
    document.body.classList.toggle('drawer-open', shop.drawerOpen)
    return () => document.body.classList.remove('drawer-open')
  }, [shop.drawerOpen])

  return (
    <div className="page">
      <a className="skip" href="#content">
        Skip to content
      </a>
      <Header />
      <main id="content">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div>
          <p className="logo">Halden</p>
          <p>Home objects, packed in Brooklyn and shipped across the US.</p>
        </div>
        <div className="footer-links">
          <Link to="/shop">Shop</Link>
          <Link to="/saved">Saved</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </footer>
      <CartDrawer />
      {shop.notice && (
        <div className="toast" role="status">
          <span>{shop.notice}</span>
          <button type="button" onClick={shop.openDrawer}>
            View
          </button>
        </div>
      )}
    </div>
  )
}

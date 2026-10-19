import { useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { shopper } from '../data/catalog.ts'
import { useShop } from '../context/shop-state.ts'
import { BagIcon, PinIcon, SearchIcon, UserIcon } from './Icons.tsx'

type Panel = 'address' | 'account' | null

export function Header() {
  const shop = useShop()
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [params] = useSearchParams()
  const paramQuery = params.get('q') ?? ''
  const [query, setQuery] = useState(paramQuery)
  const [seenQuery, setSeenQuery] = useState(paramQuery)
  const [panel, setPanel] = useState<Panel>(null)
  const [panelPath, setPanelPath] = useState(pathname)

  if (panelPath !== pathname) {
    setPanelPath(pathname)
    setPanel(null)
  }

  if (seenQuery !== paramQuery) {
    setSeenQuery(paramQuery)
    setQuery(paramQuery)
  }

  function toggle(next: Panel) {
    setPanel((current) => (current === next ? null : next))
  }

  function search(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = query.trim()
    navigate(trimmed ? `/shop?q=${encodeURIComponent(trimmed)}` : '/shop')
    setPanel(null)
  }

  const city = `${shop.address.city}, ${shop.address.region}`

  return (
    <header className="site-header">
      <div className="announce">Free shipping on orders over $150</div>
      <div className="header-bar">
        <Link to="/" className="logo" onClick={() => setPanel(null)}>
          Halden
        </Link>
        <form className="search" role="search" onSubmit={search}>
          <label className="sr-only" htmlFor="site-search">
            Search products
          </label>
          <button type="submit" className="search-submit" aria-label="Search">
            <SearchIcon className="search-icon" />
          </button>
          <input
            id="site-search"
            name="q"
            value={query}
            placeholder="Search lamps, linen, bowls"
            onChange={(event) => setQuery(event.target.value)}
          />
        </form>
        <div className="tools">
          <div className="tool-wrap">
            <button
              type="button"
              className="tool"
              aria-label={`Ship to ${city}`}
              aria-expanded={panel === 'address'}
              aria-haspopup="dialog"
              onClick={() => toggle('address')}
            >
              <PinIcon className="tool-icon" />
              <span className="tool-text">
                <span className="tool-kicker">Ship to</span>
                <span className="tool-value">{city}</span>
              </span>
            </button>
            {panel === 'address' && (
              <div className="popover" role="dialog" aria-label="Shipping address">
                <p className="popover-kicker">Ship to</p>
                <div className="address-list" role="radiogroup" aria-label="Saved addresses">
                  {shop.addresses.map((address) => {
                    const selected = address.id === shop.address.id
                    return (
                      <button
                        key={address.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        className={selected ? 'address-option is-selected' : 'address-option'}
                        onClick={() => {
                          shop.setAddressId(address.id)
                          setPanel(null)
                        }}
                      >
                        <span className="address-name">{address.name}</span>
                        <span>
                          {address.line1}
                          <br />
                          {address.city}, {address.region} {address.postalCode}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}
          </div>

          <div className="tool-wrap">
            <button
              type="button"
              className="tool"
              aria-expanded={panel === 'account'}
              aria-haspopup="dialog"
              aria-label={`Account, ${shopper.name}`}
              onClick={() => toggle('account')}
            >
              <UserIcon className="tool-icon" />
              <span className="tool-text">
                <span className="tool-kicker">Hello</span>
                <span className="tool-value">{shopper.name.split(' ')[0]}</span>
              </span>
            </button>
            {panel === 'account' && (
              <div className="popover" role="dialog" aria-label="Account">
                <p className="popover-name">{shopper.name}</p>
                <p className="popover-mail">{shopper.email}</p>
                <p className="popover-note">Cart and saved items stay on this device.</p>
                <Link to="/saved" className="popover-link" onClick={() => setPanel(null)}>
                  Saved items ({shop.savedIds.length})
                </Link>
              </div>
            )}
          </div>

          <div className="tool-wrap">
            <button
              type="button"
              className="tool tool-cart"
              aria-label={`Cart, ${shop.cartCount} ${shop.cartCount === 1 ? 'item' : 'items'}`}
              onClick={() => {
                setPanel(null)
                shop.openDrawer()
              }}
            >
              <span className="bag-wrap">
                <BagIcon className="tool-icon" />
                {shop.cartCount > 0 && <span className="bag-count">{shop.cartCount}</span>}
              </span>
              <span className="tool-text">
                <span className="tool-kicker">Cart</span>
                <span className="tool-value">
                  {shop.cartCount} {shop.cartCount === 1 ? 'item' : 'items'}
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
      {panel && <button type="button" className="panel-scrim" aria-label="Close menu" onClick={() => setPanel(null)} />}
    </header>
  )
}

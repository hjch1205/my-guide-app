import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid.tsx'
import { categoryLabel, getProductBySlug, products } from '../data/catalog.ts'
import { useShop } from '../context/shop-state.ts'
import { formatPrice } from '../lib/money.ts'
import { HeartIcon } from '../components/Icons.tsx'

export function ProductPage() {
  const { slug } = useParams()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) {
    return (
      <div className="section empty">
        <h1>We can’t find that piece</h1>
        <Link to="/shop" className="btn">
          Back to the shop
        </Link>
      </div>
    )
  }

  return <ProductDetail key={product.id} productId={product.id} />
}

function ProductDetail({ productId }: { productId: string }) {
  const product = products.find((item) => item.id === productId)!
  const shop = useShop()
  const [colorId, setColorId] = useState(product.colors[0].id)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const saved = shop.isSaved(product.id)
  const color = product.colors.find((item) => item.id === colorId) ?? product.colors[0]
  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4)

  function add() {
    shop.addToCart(product.id, color.id, qty)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <div className="section page-product">
      <p className="eyebrow">
        <Link to={`/shop?category=${product.category}`}>{categoryLabel(product.category)}</Link>
      </p>
      <div className="pdp">
        <div className="pdp-media">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="pdp-buy">
          <h1>{product.title}</h1>
          <p className="card-point">{product.sellingPoint}</p>
          <p className="card-prices pdp-prices">
            <span className="price-now">
              <span className="sr-only">Sale price </span>
              {formatPrice(product.price)}
            </span>
            <s className="price-was">
              <span className="sr-only">Original price </span>
              {formatPrice(product.originalPrice)}
            </s>
          </p>
          <p className="pdp-description">{product.description}</p>
          <p className="line-meta">Material · {product.material}</p>

          {product.colors.length > 1 && (
            <fieldset className="swatches">
              <legend>Color · {color.name}</legend>
              <div>
                {product.colors.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className={item.id === color.id ? 'swatch is-on' : 'swatch'}
                    style={{ background: item.hex }}
                    aria-label={item.name}
                    aria-pressed={item.id === color.id}
                    onClick={() => setColorId(item.id)}
                  />
                ))}
              </div>
            </fieldset>
          )}

          <div className="qty-row">
            <span id="qty-label">Quantity</span>
            <div className="stepper">
              <button type="button" aria-label="Decrease quantity" onClick={() => setQty((value) => Math.max(1, value - 1))}>
                −
              </button>
              <span aria-live="polite" aria-labelledby="qty-label">
                {qty}
              </span>
              <button type="button" aria-label="Increase quantity" onClick={() => setQty((value) => Math.min(9, value + 1))}>
                +
              </button>
            </div>
          </div>

          <div className="pdp-actions">
            <button type="button" className="btn" onClick={add}>
              {added ? 'Added' : 'Add to cart'}
            </button>
            <button
              type="button"
              className={saved ? 'btn btn-secondary is-saved' : 'btn btn-secondary'}
              aria-pressed={saved}
              onClick={() => shop.toggleSaved(product.id)}
            >
              <HeartIcon filled={saved} />
              {saved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="related">
          <div className="section-head">
            <h2>More in {categoryLabel(product.category).toLowerCase()}</h2>
          </div>
          <ProductGrid products={related} />
        </section>
      )}
    </div>
  )
}

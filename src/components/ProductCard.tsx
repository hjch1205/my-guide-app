import { useState, type MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import { useShop } from '../context/shop-state.ts'
import { formatPrice } from '../lib/money.ts'
import type { Product } from '../types.ts'
import { HeartIcon } from './Icons.tsx'

type ProductCardProps = {
  product: Product
}

/** 商卡：列表中的单件商品。点卡片进入详情，收藏和加购不跳转。 */
export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isSaved, toggleSaved } = useShop()
  const saved = isSaved(product.id)
  const [added, setAdded] = useState(false)
  const color = product.colors[0]

  function save(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    toggleSaved(product.id)
  }

  function add(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    event.stopPropagation()
    addToCart(product.id, color.id, 1)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1400)
  }

  return (
    <article className="card">
      <Link to={`/product/${product.slug}`} className="card-link">
        <div className="card-media">
          <img src={product.image} alt="" />
        </div>
        <div className="card-copy">
          <h3>{product.title}</h3>
          <p className="card-point">{product.sellingPoint}</p>
          <p className="card-prices">
            <span className="price-now">
              <span className="sr-only">Sale price </span>
              {formatPrice(product.price)}
            </span>
            <s className="price-was">
              <span className="sr-only">Original price </span>
              {formatPrice(product.originalPrice)}
            </s>
          </p>
        </div>
      </Link>
      <div className="card-actions">
        <button
          type="button"
          className={saved ? 'card-save is-saved' : 'card-save'}
          aria-pressed={saved}
          aria-label={saved ? `Remove ${product.title} from saved items` : `Save ${product.title}`}
          onClick={save}
        >
          <HeartIcon filled={saved} />
          <span>{saved ? 'Saved' : 'Save'}</span>
        </button>
        <button type="button" className="card-add" onClick={add}>
          {added ? 'Added' : 'Add to cart'}
        </button>
      </div>
    </article>
  )
}

ProductCard.displayName = '商卡'

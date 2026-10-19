import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid.tsx'
import { categories, products } from '../data/catalog.ts'
import type { Product } from '../types.ts'

const sorts = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price: low to high' },
  { id: 'price-desc', label: 'Price: high to low' },
] as const

export function ShopPage() {
  const [params, setParams] = useSearchParams()
  const query = (params.get('q') ?? '').trim()
  const category = params.get('category') ?? 'all'
  const sort = params.get('sort') ?? 'featured'

  const visible = useMemo(() => {
    const needle = query.toLowerCase()
    const filtered = products.filter((product) => {
      const inCategory = category === 'all' || product.category === category
      const haystack = `${product.title} ${product.sellingPoint} ${product.material}`.toLowerCase()
      return inCategory && (needle.length === 0 || haystack.includes(needle))
    })
    const ranked = [...filtered]
    ranked.sort((a, b) => compareProducts(a, b, sort))
    return ranked
  }, [category, query, sort])

  function setParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'all' || (key === 'sort' && value === 'featured')) next.delete(key)
    else next.set(key, value)
    setParams(next)
  }

  const categoryLabel = categories.find((item) => item.id === category)?.label

  return (
    <div className="section shop">
      <div className="section-head">
        <div>
          <p className="eyebrow">The collection</p>
          <h1>{categoryLabel ?? 'All objects'}</h1>
          {query && (
            <p className="query-note">
              Results for “{query}”
              <button type="button" onClick={() => setParam('q', '')}>
                Clear
              </button>
            </p>
          )}
        </div>
      </div>

      <div className="shop-tools">
        <div className="chips" role="group" aria-label="Categories">
          <button
            type="button"
            aria-pressed={category === 'all'}
            className={category === 'all' ? 'chip is-on' : 'chip'}
            onClick={() => setParam('category', 'all')}
          >
            All
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              aria-pressed={category === item.id}
              className={category === item.id ? 'chip is-on' : 'chip'}
              onClick={() => setParam('category', item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>
        <label className="sort">
          Sort
          <select value={sorts.some((item) => item.id === sort) ? sort : 'featured'} onChange={(event) => setParam('sort', event.target.value)}>
            {sorts.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="result-count">
        {visible.length} {visible.length === 1 ? 'piece' : 'pieces'}
      </p>

      {visible.length === 0 ? (
        <div className="empty">
          <h2>Nothing matches</h2>
          <p>Try a material, a room, or another category.</p>
          <Link to="/shop" className="btn">
            Clear filters
          </Link>
        </div>
      ) : (
        <ProductGrid products={visible} />
      )}
    </div>
  )
}

function compareProducts(a: Product, b: Product, sort: string) {
  if (sort === 'price-asc') return a.price - b.price
  if (sort === 'price-desc') return b.price - a.price
  if (a.featured !== b.featured) return a.featured ? -1 : 1
  return 0
}

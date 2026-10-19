import { Link } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid.tsx'
import { useShop } from '../context/shop-state.ts'
import { products } from '../data/catalog.ts'

export function SavedPage() {
  const { savedIds } = useShop()
  const saved = products.filter((product) => savedIds.includes(product.id))

  return (
    <div className="section">
      <div className="section-head">
        <div>
          <p className="eyebrow">Your list</p>
          <h1>Saved</h1>
        </div>
      </div>
      {saved.length === 0 ? (
        <div className="empty">
          <p>Save a piece from its card and it will wait here.</p>
          <Link to="/shop" className="btn">
            Browse the shop
          </Link>
        </div>
      ) : (
        <ProductGrid products={saved} />
      )}
    </div>
  )
}

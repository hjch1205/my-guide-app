import { Link } from 'react-router-dom'
import { ProductGrid } from '../components/ProductGrid.tsx'
import { categories, products } from '../data/catalog.ts'

function asset(file: string) {
  return `${import.meta.env.BASE_URL}${file}`
}

const categoryImage: Record<(typeof categories)[number]['id'], string> = {
  lighting: asset('products/arc-lamp.jpg'),
  textiles: asset('products/towel.jpg'),
  tableware: asset('products/bowl.jpg'),
  objects: asset('products/lounge.jpg'),
}

export function HomePage() {
  const featured = products.filter((product) => product.featured)

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Home objects</p>
          <h1>A quieter room, shipped to your door.</h1>
          <p>
            Lamps, linen, and tableware chosen for apartments that should still feel like yours.
          </p>
          <Link to="/shop" className="btn">
            Shop the collection
          </Link>
        </div>
        <img src={asset('products/hero.jpg')} alt="A living room with a grey sofa, oak table, and an arc lamp" />
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Shop by room and material</h2>
        </div>
        <ul className="category-row">
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/shop?category=${category.id}`}>
                <img src={categoryImage[category.id]} alt="" />
                <span>{category.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>In the shop</h2>
          <Link to="/shop">View all</Link>
        </div>
        <ProductGrid products={featured} />
      </section>
    </div>
  )
}

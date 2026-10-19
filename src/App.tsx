import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { ShopProvider } from './context/ShopContext.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { CheckoutPage, OrderPage } from './pages/CheckoutPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ProductPage } from './pages/ProductPage.tsx'
import { SavedPage } from './pages/SavedPage.tsx'
import { ShopPage } from './pages/ShopPage.tsx'

const basename = import.meta.env.BASE_URL.replace(/\/$/, '')
const useHash = import.meta.env.VITE_ROUTER === 'hash'

export default function App() {
  const routes = (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="shop" element={<ShopPage />} />
        <Route path="product/:slug" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="saved" element={<SavedPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="order/:orderId" element={<OrderPage />} />
      </Route>
    </Routes>
  )

  return (
    <ShopProvider>
      {useHash ? <HashRouter>{routes}</HashRouter> : <BrowserRouter basename={basename}>{routes}</BrowserRouter>}
    </ShopProvider>
  )
}

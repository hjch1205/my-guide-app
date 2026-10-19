import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { ShopProvider } from './context/ShopContext.tsx'
import { CartPage } from './pages/CartPage.tsx'
import { CheckoutPage, OrderPage } from './pages/CheckoutPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { ProductPage } from './pages/ProductPage.tsx'
import { SavedPage } from './pages/SavedPage.tsx'
import { ShopPage } from './pages/ShopPage.tsx'

export default function App() {
  return (
    <ShopProvider>
      <BrowserRouter>
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
      </BrowserRouter>
    </ShopProvider>
  )
}

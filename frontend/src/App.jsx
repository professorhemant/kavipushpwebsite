import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home         from './pages/Home';
import BridalChuda  from './pages/BridalChuda';
import Bangles      from './pages/Bangles';
import ProductDetail from './pages/ProductDetail';
import Cart         from './pages/Cart';
import Checkout     from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import About        from './pages/About';
import Admin        from './pages/Admin';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <Routes>
        {/* Admin — no navbar/footer */}
        <Route path="/admin" element={<Admin />} />

        {/* Public routes */}
        <Route path="/*" element={
          <Layout>
            <Routes>
              <Route index           element={<Home />} />
              <Route path="bridal-chuda" element={<BridalChuda />} />
              <Route path="bangles"      element={<Bangles />} />
              <Route path="product/:slug" element={<ProductDetail />} />
              <Route path="cart"         element={<Cart />} />
              <Route path="checkout"     element={<Checkout />} />
              <Route path="order-success" element={<OrderSuccess />} />
              <Route path="about"        element={<About />} />
            </Routes>
          </Layout>
        } />
      </Routes>
    </CartProvider>
  );
}

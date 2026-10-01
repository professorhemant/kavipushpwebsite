import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || '';
const imgSrc = img => img ? (img.startsWith('http') ? img : API + img) : '/placeholder.jpg';

export default function Cart() {
  const { items, removeItem, updateQty, total, shipping, count } = useCart();

  if (count === 0) return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">🛒</div>
      <h2 className="font-serif text-maroon text-3xl mb-4">Your cart is empty</h2>
      <p className="text-gray-500 font-sans mb-8">Explore our bridal collections and add something beautiful.</p>
      <Link to="/bridal-chuda" className="btn-maroon">Shop Now</Link>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-maroon text-4xl mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <div key={item.key} className="flex gap-4 bg-white border border-gold/20 p-4">
              <img src={imgSrc(item.image)} alt={item.name}
                className="w-24 h-24 object-cover flex-shrink-0 border border-gold/10" />
              <div className="flex-1">
                <Link to={`/product/${item.slug}`}
                  className="font-serif text-maroon hover:text-maroon-light block mb-1">{item.name}</Link>
                <p className="text-xs text-gray-400 font-sans mb-2">
                  {item.size && `Size: ${item.size}`} {item.color && `· Color: ${item.color}`}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-0">
                    <button onClick={() => updateQty(item.key, item.qty - 1)}
                      className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-lg">−</button>
                    <span className="w-10 h-8 border-t border-b border-gray-200 flex items-center justify-center font-sans text-sm">{item.qty}</span>
                    <button onClick={() => updateQty(item.key, item.qty + 1)}
                      className="w-8 h-8 border border-gray-200 flex items-center justify-center hover:bg-gray-50 text-lg">+</button>
                  </div>
                  <span className="font-serif text-maroon">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <button onClick={() => removeItem(item.key)} className="text-gray-300 hover:text-red-400 transition-colors self-start">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-cream-dark border border-gold/20 p-6 h-fit">
          <h3 className="font-serif text-maroon text-xl mb-6">Order Summary</h3>
          <div className="space-y-3 font-sans text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>
                {shipping === 0 ? 'FREE' : `₹${shipping}`}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-gray-400">Add ₹{(999 - total).toFixed(0)} more for free shipping</p>
            )}
            <div className="border-t border-gold/20 pt-3 flex justify-between font-medium text-base">
              <span>Total</span>
              <span className="font-serif text-maroon text-lg">₹{(total + shipping).toLocaleString('en-IN')}</span>
            </div>
          </div>
          <Link to="/checkout" className="btn-maroon w-full text-center block">Proceed to Checkout</Link>
          <Link to="/bridal-chuda" className="block text-center text-xs text-gold font-sans mt-4 hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

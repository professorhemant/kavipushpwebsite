import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

export default function ProductCard({ product }) {
  const { addItem } = useCart();
  const img = product.images?.[0]
    ? (product.images[0].startsWith('http') ? product.images[0] : API + product.images[0])
    : '/placeholder.jpg';

  const discount = product.mrp && product.mrp > product.price
    ? Math.round((1 - product.price / product.mrp) * 100)
    : null;

  const handleAdd = (e) => {
    e.preventDefault();
    addItem(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block bg-white border border-gold/20 hover:border-gold/60 transition-all duration-300 hover:shadow-lg">
      {/* Image */}
      <div className="relative overflow-hidden aspect-[3/4]">
        <img src={img} alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={e => { e.target.src = '/placeholder.jpg'; }}
        />
        {discount && (
          <span className="absolute top-2 left-2 bg-maroon text-cream text-xs px-2 py-1 font-sans">
            {discount}% OFF
          </span>
        )}
        {!product.stock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-cream font-sans tracking-widest text-sm">OUT OF STOCK</span>
          </div>
        )}
        {product.stock > 0 && (
          <button onClick={handleAdd}
            className="absolute bottom-0 left-0 right-0 bg-maroon text-cream text-xs tracking-widest font-sans py-3
                       opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0
                       transition-all duration-300 hover:bg-maroon-dark">
            ADD TO CART
          </button>
        )}
      </div>

      {/* Info */}
      <div className="p-3">
        <p className="text-xs text-gold font-sans tracking-wider mb-1">
          {product.category?.name?.toUpperCase()}
        </p>
        <h3 className="font-serif text-maroon text-sm leading-tight line-clamp-2 mb-2">
          {product.name}
        </h3>
        <div className="flex items-baseline gap-2">
          <span className="font-serif text-lg text-maroon">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
          {product.mrp > product.price && (
            <span className="text-sm text-gray-400 line-through">₹{parseFloat(product.mrp).toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>
    </Link>
  );
}

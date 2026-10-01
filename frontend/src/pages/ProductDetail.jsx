import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProduct } from '../api';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

export default function ProductDetail() {
  const { slug } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const [selSize, setSelSize]     = useState('');
  const [selColor, setSelColor]   = useState('');
  const [qty, setQty]             = useState(1);

  useEffect(() => {
    setLoading(true);
    getProduct(slug)
      .then(r => { setProduct(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <div className="animate-spin w-10 h-10 border-4 border-gold border-t-transparent rounded-full" />
    </div>
  );
  if (!product) return (
    <div className="text-center py-20 text-gray-400 font-serif text-xl">Product not found.</div>
  );

  const images = product.images?.length ? product.images : ['/placeholder.jpg'];
  const imgSrc = i => (images[i]?.startsWith('http') ? images[i] : API + images[i]);
  const discount = product.mrp > product.price
    ? Math.round((1 - product.price / product.mrp) * 100) : null;

  const handleAdd = () => {
    if (product.sizes?.length && !selSize) { toast.error('Please select a size'); return; }
    addItem(product, qty, selSize, selColor);
    toast.success('Added to cart!');
  };

  const whatsappText = `Hi Kavipushp, I'm interested in: ${product.name} (₹${product.price})\n${window.location.href}`;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Breadcrumb */}
      <nav className="text-xs font-sans text-gray-400 mb-8 flex gap-2 items-center">
        <Link to="/" className="hover:text-gold">Home</Link>
        <span>/</span>
        <Link to={`/${product.category?.slug}`} className="hover:text-gold">{product.category?.name}</Link>
        <span>/</span>
        <span className="text-gray-600">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="aspect-square overflow-hidden border border-gold/20 mb-3">
            <img src={imgSrc(activeImg)} alt={product.name}
              className="w-full h-full object-cover" />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {images.map((_, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 flex-shrink-0 border-2 overflow-hidden transition-colors ${
                    activeImg === i ? 'border-gold' : 'border-transparent'
                  }`}>
                  <img src={imgSrc(i)} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <p className="text-gold font-sans text-xs tracking-widest mb-2">{product.category?.name?.toUpperCase()}</p>
          <h1 className="font-serif text-maroon text-3xl leading-tight mb-4">{product.name}</h1>

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-1">
            <span className="font-serif text-3xl text-maroon">₹{parseFloat(product.price).toLocaleString('en-IN')}</span>
            {product.mrp > product.price && (
              <span className="text-gray-400 text-lg line-through">₹{parseFloat(product.mrp).toLocaleString('en-IN')}</span>
            )}
            {discount && <span className="bg-maroon text-cream text-xs px-2 py-1">{discount}% OFF</span>}
          </div>
          <p className="text-green-600 text-xs font-sans mb-6">Inclusive of all taxes</p>

          <div className="w-full h-px bg-gold/20 mb-6" />

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mb-6">
              <p className="font-sans text-sm font-medium text-gray-700 mb-2 tracking-wider">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(s => (
                  <button key={s} onClick={() => setSelSize(s)}
                    className={`px-4 py-2 text-sm font-sans border transition-colors ${
                      selSize === s ? 'bg-maroon text-cream border-maroon' : 'border-gray-300 hover:border-maroon text-gray-600'
                    }`}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mb-6">
              <p className="font-sans text-sm font-medium text-gray-700 mb-2 tracking-wider">COLOR</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(c => (
                  <button key={c} onClick={() => setSelColor(c)}
                    className={`px-4 py-2 text-sm font-sans border transition-colors ${
                      selColor === c ? 'bg-maroon text-cream border-maroon' : 'border-gray-300 hover:border-maroon text-gray-600'
                    }`}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div className="mb-8">
            <p className="font-sans text-sm font-medium text-gray-700 mb-2 tracking-wider">QUANTITY</p>
            <div className="flex items-center gap-0 w-32">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50">−</button>
              <span className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center font-sans">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="w-10 h-10 border border-gray-300 flex items-center justify-center text-lg hover:bg-gray-50">+</button>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <button onClick={handleAdd} disabled={!product.stock}
              className="btn-maroon flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
              {product.stock ? 'Add to Cart' : 'Out of Stock'}
            </button>
            <a href={`https://wa.me/91XXXXXXXXXX?text=${encodeURIComponent(whatsappText)}`}
               target="_blank" rel="noreferrer"
               className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 font-sans text-sm font-medium hover:bg-green-700 transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Order on WhatsApp
            </a>
          </div>

          {/* Product info */}
          {product.description && (
            <div className="border-t border-gold/20 pt-6">
              <h4 className="font-sans text-sm font-medium text-gray-700 mb-3 tracking-wider">DESCRIPTION</h4>
              <p className="text-gray-600 font-sans text-sm leading-relaxed">{product.description}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3 mt-4 text-xs font-sans text-gray-500">
            {product.material && <span>Material: {product.material}</span>}
            {product.occasion && <span>Occasion: {product.occasion}</span>}
            {product.weight   && <span>Weight: {product.weight}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

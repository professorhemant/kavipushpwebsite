import { useEffect, useState } from 'react';
import { getProducts } from '../api';
import ProductCard from './ProductCard';

export default function CollectionPage({ categorySlug, title, subtitle }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [page, setPage]         = useState(1);
  const [total, setTotal]       = useState(0);
  const LIMIT = 12;

  useEffect(() => {
    setLoading(true);
    getProducts({ category: categorySlug, page, limit: LIMIT })
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [categorySlug, page]);

  return (
    <div>
      {/* Page header */}
      <div className="bg-maroon py-14 text-center">
        <h1 className="font-serif text-cream text-4xl md:text-5xl mb-3">{title}</h1>
        <div className="flex items-center justify-center gap-3 mb-3">
          <span className="h-px bg-gold/40 w-16" />
          <span className="text-gold">✦</span>
          <span className="h-px bg-gold/40 w-16" />
        </div>
        <p className="text-cream/70 font-sans text-sm tracking-wider">{subtitle}</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-gray-100 animate-pulse aspect-[3/4]" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-400 font-serif text-xl mb-2">No products yet</p>
            <p className="text-gray-400 font-sans text-sm">Check back soon — new arrivals coming!</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 font-sans text-sm mb-6">{total} products</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>

            {/* Pagination */}
            {total > LIMIT && (
              <div className="flex justify-center gap-2 mt-12">
                {Array.from({ length: Math.ceil(total / LIMIT) }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={`w-9 h-9 font-sans text-sm transition-colors ${
                      page === n ? 'bg-maroon text-cream' : 'border border-maroon text-maroon hover:bg-maroon hover:text-cream'
                    }`}>
                    {n}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

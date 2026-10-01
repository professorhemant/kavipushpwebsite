import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../api';
import ProductCard from '../components/ProductCard';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    getProducts({ featured: true, limit: 8 })
      .then(r => setFeatured(r.data.products))
      .catch(() => {});
  }, []);

  return (
    <div>
      {/* ── Hero Banner ── */}
      <section className="relative h-[85vh] min-h-[560px] overflow-hidden bg-maroon-dark flex items-center">
        <img
          src="https://raw.githubusercontent.com/professorhemant/kavipushpwebsite/main/frontend/public/banner.jpg"
          alt="Kavipushp Bridal Banner"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-maroon-dark/90 via-maroon-dark/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          {/* Top label */}
          <p className="text-gold font-sans text-xs tracking-[0.3em] mb-4">
            EST. 2015 &nbsp;✦&nbsp; SRIGANGANAGAR, RAJASTHAN
          </p>
          <h1 className="font-serif text-cream text-5xl md:text-7xl leading-tight mb-2">
            Kavipushp
          </h1>
          <p className="font-serif italic text-gold text-xl md:text-2xl mb-6">
            Bridal Chuda &amp; Bangles
          </p>
          <div className="w-20 h-px bg-gold mb-6" />
          <p className="text-cream/80 font-sans text-sm md:text-base max-w-md mb-10 leading-relaxed">
            Handcrafted with tradition, adorned with love. Exquisite bridal chuda
            &amp; bangles crafted for your most cherished moments.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/bridal-chuda" className="btn-gold">Explore Chuda</Link>
            <Link to="/bangles" className="btn-outline-gold border-gold text-gold hover:bg-gold hover:text-white">
              Shop Bangles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-16 bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title">Our Collections</h2>
          <div className="section-divider">
            <span className="gold-line" />
            <span className="text-gold text-lg">✦</span>
            <span className="gold-line" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Bridal Chuda card */}
            <Link to="/bridal-chuda"
              className="relative h-80 overflow-hidden group bg-maroon flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-maroon/90 to-transparent z-10" />
              <div className="relative z-20">
                <p className="text-gold font-sans text-xs tracking-widest mb-2">SIGNATURE COLLECTION</p>
                <h3 className="font-serif text-cream text-3xl mb-3">Bridal Chuda</h3>
                <span className="text-cream/70 font-sans text-sm underline underline-offset-4 hover:text-gold transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
            {/* Bangles card */}
            <Link to="/bangles"
              className="relative h-80 overflow-hidden group bg-maroon-light flex items-end p-8">
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-dark/90 to-transparent z-10" />
              <div className="relative z-20">
                <p className="text-gold font-sans text-xs tracking-widest mb-2">PREMIUM SELECTION</p>
                <h3 className="font-serif text-cream text-3xl mb-3">Bangles</h3>
                <span className="text-cream/70 font-sans text-sm underline underline-offset-4 hover:text-gold transition-colors">
                  Explore →
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Featured Products ── */}
      {featured.length > 0 && (
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="section-title">Featured Products</h2>
            <div className="section-divider">
              <span className="gold-line" />
              <span className="text-gold text-lg">✦</span>
              <span className="gold-line" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featured.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="text-center mt-10">
              <Link to="/bridal-chuda" className="btn-outline-gold border-maroon text-maroon hover:bg-maroon hover:text-cream">
                View All Products
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ── Why Choose Us ── */}
      <section className="py-16 bg-maroon text-cream">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="section-title text-cream">Why Choose Kavipushp</h2>
          <div className="section-divider">
            <span className="h-px bg-gold/40 flex-1 max-w-24" />
            <span className="text-gold text-lg">✦</span>
            <span className="h-px bg-gold/40 flex-1 max-w-24" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { icon: '✦', title: 'Handcrafted', desc: 'Every piece made with care and tradition' },
              { icon: '🔒', title: 'Pure Quality', desc: 'Genuine materials, certified purity' },
              { icon: '🚚', title: 'Free Shipping', desc: 'On all orders above ₹999' },
              { icon: '💬', title: 'Easy Returns', desc: '7-day hassle-free return policy' },
            ].map(f => (
              <div key={f.title}>
                <div className="text-3xl mb-3">{f.icon}</div>
                <h4 className="font-serif text-gold text-lg mb-2">{f.title}</h4>
                <p className="text-cream/70 text-sm font-sans">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WhatsApp Banner ── */}
      <section className="py-12 bg-cream-dark text-center">
        <h3 className="font-serif text-maroon text-2xl mb-2">Need Help Choosing?</h3>
        <p className="text-gray-600 font-sans mb-6">Chat with us on WhatsApp — we'll help you find the perfect set</p>
        <a href="https://wa.me/91XXXXXXXXXX?text=Hi%20Kavipushp%2C%20I%20need%20help%20choosing%20bridal%20jewellery"
           target="_blank" rel="noreferrer"
           className="inline-flex items-center gap-2 bg-green-600 text-white px-8 py-3 font-sans font-medium hover:bg-green-700 transition-colors">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          Chat on WhatsApp
        </a>
      </section>
    </div>
  );
}

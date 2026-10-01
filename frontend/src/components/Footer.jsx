import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-cream/80">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h3 className="font-serif text-2xl text-cream mb-1">Kavipushp</h3>
          <p className="text-gold text-xs tracking-widest mb-4 font-sans">BRIDAL JEWELLERY</p>
          <p className="text-sm leading-relaxed">
            Handcrafted bridal chuda & bangles with tradition and love.
            Est. 2015, Sriganganagar, Rajasthan.
          </p>
          <div className="mt-4 flex gap-4">
            <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer"
               className="text-gold hover:text-gold-light transition-colors text-sm">
              WhatsApp
            </a>
            <a href="https://www.instagram.com/kavipushp/" target="_blank" rel="noreferrer"
               className="text-gold hover:text-gold-light transition-colors text-sm">
              Instagram
            </a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="text-gold font-sans text-xs tracking-widest mb-4">QUICK LINKS</h4>
          <ul className="space-y-2 text-sm">
            {[
              { to: '/', label: 'Home' },
              { to: '/bridal-chuda', label: 'Bridal Chuda' },
              { to: '/bangles', label: 'Bangles' },
              { to: '/about', label: 'About Us' },
              { to: '/cart', label: 'My Cart' },
            ].map(l => (
              <li key={l.to}>
                <Link to={l.to} className="hover:text-gold transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-gold font-sans text-xs tracking-widest mb-4">CONTACT US</h4>
          <ul className="space-y-2 text-sm">
            <li>📍 Sriganganagar, Rajasthan</li>
            <li>📞 <a href="tel:+91XXXXXXXXXX" className="hover:text-gold">+91 XXXXX XXXXX</a></li>
            <li>✉️ <a href="mailto:kavipushp@gmail.com" className="hover:text-gold">kavipushp@gmail.com</a></li>
            <li>🕐 Mon–Sat: 10 AM – 8 PM</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/20 py-4 text-center text-xs text-cream/50 font-sans tracking-wider">
        © {new Date().getFullYear()} Kavipushp. All rights reserved. &nbsp;✦&nbsp; kavipushp.com
      </div>
    </footer>
  );
}

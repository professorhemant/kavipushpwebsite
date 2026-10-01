import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/', label: 'Home' },
    { to: '/bridal-chuda', label: 'Bridal Chuda' },
    { to: '/bangles', label: 'Bangles' },
    { to: '/about', label: 'About & Contact' },
  ];

  return (
    <header className="bg-maroon shadow-lg sticky top-0 z-50">
      {/* Top strip */}
      <div className="bg-maroon-dark text-gold text-center text-xs py-1.5 tracking-widest font-sans">
        FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;✦&nbsp; EST. 2015 · SRIGANGANAGAR
      </div>

      <nav className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="font-serif text-2xl text-cream tracking-wide">Kavipushp</span>
          <span className="text-gold text-xs tracking-widest font-sans">BRIDAL JEWELLERY</span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `text-sm tracking-wider font-sans transition-colors duration-200 ${
                    isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                  }`
                }
              >
                {l.label.toUpperCase()}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Cart + Hamburger */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative text-cream hover:text-gold transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
            </svg>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gold text-white text-xs w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {count}
              </span>
            )}
          </Link>

          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} className="md:hidden text-cream hover:text-gold">
            {open
              ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
              : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-maroon-dark border-t border-gold/20">
          {links.map(l => (
            <NavLink key={l.to} to={l.to} end={l.to === '/'}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `block px-6 py-3 text-sm tracking-widest font-sans border-b border-gold/10 ${
                  isActive ? 'text-gold' : 'text-cream/80 hover:text-gold'
                }`
              }
            >
              {l.label.toUpperCase()}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}

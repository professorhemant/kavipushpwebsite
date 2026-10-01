import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('kp_cart') || '[]'); }
    catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem('kp_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, qty = 1, size = '', color = '') => {
    setItems(prev => {
      const key = `${product.id}-${size}-${color}`;
      const existing = prev.find(i => i.key === key);
      if (existing) {
        return prev.map(i => i.key === key ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        key, qty, size, color,
        product_id: product.id,
        name:  product.name,
        price: parseFloat(product.price),
        image: product.images?.[0] || '',
        slug:  product.slug
      }];
    });
  };

  const removeItem = key => setItems(prev => prev.filter(i => i.key !== key));

  const updateQty = (key, qty) => {
    if (qty < 1) { removeItem(key); return; }
    setItems(prev => prev.map(i => i.key === key ? { ...i, qty } : i));
  };

  const clearCart = () => setItems([]);

  const total    = items.reduce((s, i) => s + i.price * i.qty, 0);
  const count    = items.reduce((s, i) => s + i.qty, 0);
  const shipping = total >= 999 ? 0 : 99;

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, shipping }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);

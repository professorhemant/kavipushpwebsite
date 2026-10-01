import { useState, useEffect } from 'react';
import {
  adminLogin, getStats, getOrders, updateOrderStatus,
  getProducts, deleteProduct, createProduct,
  getCategories, createCategory
} from '../api';
import toast from 'react-hot-toast';

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem('kp_admin_token') || '');
  const [view, setView]   = useState('dashboard');

  if (!token) return <LoginScreen onLogin={t => { localStorage.setItem('kp_admin_token', t); setToken(t); }} />;

  const logout = () => { localStorage.removeItem('kp_admin_token'); setToken(''); };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-maroon-dark text-cream flex flex-col">
        <div className="p-5 border-b border-gold/20">
          <p className="font-serif text-lg text-cream">Kavipushp</p>
          <p className="text-gold text-xs tracking-widest font-sans">ADMIN PANEL</p>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {[
            ['dashboard', 'Dashboard'],
            ['orders', 'Orders'],
            ['products', 'Products'],
            ['categories', 'Categories'],
            ['add-product', 'Add Product'],
          ].map(([key, label]) => (
            <button key={key} onClick={() => setView(key)}
              className={`w-full text-left px-3 py-2.5 text-sm font-sans rounded transition-colors ${
                view === key ? 'bg-gold text-white' : 'text-cream/70 hover:text-cream hover:bg-white/10'
              }`}>
              {label}
            </button>
          ))}
        </nav>
        <button onClick={logout}
          className="m-3 text-cream/50 hover:text-cream font-sans text-xs text-left px-3 py-2 transition-colors">
          Logout →
        </button>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-6">
        {view === 'dashboard'   && <Dashboard />}
        {view === 'orders'      && <Orders />}
        {view === 'products'    && <Products onDelete={() => {}} />}
        {view === 'categories'  && <Categories />}
        {view === 'add-product' && <AddProduct onSaved={() => setView('products')} />}
      </main>
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [email, setEmail]     = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await adminLogin({ email, password });
      onLogin(data.token);
      toast.success('Welcome back!');
    } catch {
      toast.error('Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-maroon flex items-center justify-center">
      <form onSubmit={handleLogin} className="bg-white p-8 w-full max-w-sm">
        <h1 className="font-serif text-maroon text-2xl mb-1">Kavipushp</h1>
        <p className="text-gold text-xs tracking-widest font-sans mb-8">ADMIN PANEL</p>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-sans font-medium text-gray-600 tracking-wider block mb-1">EMAIL</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-maroon focus:outline-none" />
          </div>
          <div>
            <label className="text-xs font-sans font-medium text-gray-600 tracking-wider block mb-1">PASSWORD</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              className="w-full border border-gray-300 px-3 py-2.5 text-sm focus:border-maroon focus:outline-none" />
          </div>
          <button type="submit" disabled={loading}
            className="btn-maroon w-full disabled:opacity-50">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>
      </form>
    </div>
  );
}

function Dashboard() {
  const [stats, setStats] = useState(null);
  useEffect(() => { getStats().then(r => setStats(r.data)).catch(() => {}); }, []);

  const cards = stats ? [
    { label: 'Total Orders',     value: stats.totalOrders },
    { label: 'Revenue (Paid)',   value: '₹' + (stats.totalRevenue || 0).toLocaleString('en-IN') },
    { label: 'Active Products',  value: stats.totalProducts },
    { label: 'Pending Orders',   value: stats.pendingOrders },
  ] : [];

  return (
    <div>
      <h2 className="font-serif text-maroon text-2xl mb-6">Dashboard</h2>
      {!stats ? (
        <div className="text-gray-400 font-sans text-sm">Loading...</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {cards.map(c => (
            <div key={c.label} className="bg-white border border-gold/20 p-5">
              <p className="text-xs font-sans text-gray-400 tracking-wider mb-2">{c.label.toUpperCase()}</p>
              <p className="font-serif text-maroon text-3xl">{c.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getOrders({ limit: 50 }).then(r => setOrders(r.data.orders)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700',
    confirmed: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    delivered: 'bg-green-100 text-green-700',
    cancelled: 'bg-red-100 text-red-700',
  };

  const handleStatus = async (id, status) => {
    try {
      await updateOrderStatus(id, status);
      setOrders(o => o.map(x => x.id === id ? { ...x, status } : x));
      toast.success('Status updated');
    } catch { toast.error('Failed'); }
  };

  if (loading) return <div className="text-gray-400 font-sans text-sm">Loading...</div>;

  return (
    <div>
      <h2 className="font-serif text-maroon text-2xl mb-6">Orders ({orders.length})</h2>
      <div className="bg-white border border-gold/20 overflow-x-auto">
        <table className="w-full text-sm font-sans">
          <thead className="bg-cream-dark">
            <tr>
              {['Order #', 'Customer', 'Phone', 'Total', 'Status', 'Date', 'Action'].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs text-gray-500 tracking-wider font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} className="border-t border-gray-100 hover:bg-gray-50">
                <td className="px-4 py-3 font-medium text-maroon">{o.order_number}</td>
                <td className="px-4 py-3">{o.customer_name}</td>
                <td className="px-4 py-3 text-gray-500">{o.customer_phone}</td>
                <td className="px-4 py-3">₹{parseFloat(o.total).toLocaleString('en-IN')}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${statusColors[o.status]}`}>{o.status}</span>
                </td>
                <td className="px-4 py-3 text-gray-400 text-xs">{new Date(o.createdAt).toLocaleDateString('en-IN')}</td>
                <td className="px-4 py-3">
                  <select value={o.status} onChange={e => handleStatus(o.id, e.target.value)}
                    className="text-xs border border-gray-200 px-2 py-1 focus:outline-none">
                    {['pending','confirmed','shipped','delivered','cancelled'].map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400">No orders yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const API = import.meta.env.VITE_API_URL?.replace('/api', '') || '';

  const load = () => {
    getProducts({ limit: 100 }).then(r => setProducts(r.data.products)).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleDelete = async id => {
    if (!confirm('Delete this product?')) return;
    try { await deleteProduct(id); toast.success('Deleted'); load(); }
    catch { toast.error('Failed'); }
  };

  if (loading) return <div className="text-gray-400 font-sans text-sm">Loading...</div>;

  return (
    <div>
      <h2 className="font-serif text-maroon text-2xl mb-6">Products ({products.length})</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(p => {
          const img = p.images?.[0] ? (p.images[0].startsWith('http') ? p.images[0] : API + p.images[0]) : null;
          return (
            <div key={p.id} className="bg-white border border-gold/20 overflow-hidden">
              <div className="aspect-square bg-gray-100">
                {img && <img src={img} alt={p.name} className="w-full h-full object-cover" />}
              </div>
              <div className="p-3">
                <p className="font-serif text-maroon text-sm line-clamp-2 mb-1">{p.name}</p>
                <p className="text-gold font-sans text-sm mb-2">₹{parseFloat(p.price).toLocaleString('en-IN')}</p>
                <div className="flex gap-2">
                  <span className={`text-xs px-2 py-0.5 ${p.is_featured ? 'bg-gold/20 text-gold-dark' : 'bg-gray-100 text-gray-400'}`}>
                    {p.is_featured ? 'Featured' : 'Normal'}
                  </span>
                  <span className={`text-xs px-2 py-0.5 ${p.stock > 0 ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                    {p.stock > 0 ? `Stock: ${p.stock}` : 'Out of stock'}
                  </span>
                </div>
                <button onClick={() => handleDelete(p.id)}
                  className="mt-2 text-xs text-red-400 hover:text-red-600 font-sans">Delete</button>
              </div>
            </div>
          );
        })}
        {products.length === 0 && <p className="col-span-4 text-center text-gray-400 font-sans py-8">No products yet.</p>}
      </div>
    </div>
  );
}

function Categories() {
  const [cats, setCats] = useState([]);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [desc, setDesc] = useState('');

  const load = () => getCategories().then(r => setCats(r.data)).catch(() => {});
  useEffect(load, []);

  const handleCreate = async e => {
    e.preventDefault();
    try {
      await createCategory({ name, slug: slug || name.toLowerCase().replace(/\s+/g, '-'), description: desc });
      toast.success('Category created');
      setName(''); setSlug(''); setDesc('');
      load();
    } catch { toast.error('Failed'); }
  };

  return (
    <div>
      <h2 className="font-serif text-maroon text-2xl mb-6">Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Existing */}
        <div className="bg-white border border-gold/20 p-4">
          <h3 className="font-sans text-sm font-medium text-gray-600 tracking-wider mb-4">EXISTING CATEGORIES</h3>
          {cats.map(c => (
            <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-sans text-sm text-gray-700">{c.name}</p>
                <p className="font-sans text-xs text-gray-400">{c.slug}</p>
              </div>
            </div>
          ))}
          {cats.length === 0 && <p className="text-gray-400 text-sm font-sans">No categories yet.</p>}
        </div>

        {/* Create */}
        <form onSubmit={handleCreate} className="bg-white border border-gold/20 p-4">
          <h3 className="font-sans text-sm font-medium text-gray-600 tracking-wider mb-4">ADD CATEGORY</h3>
          <div className="space-y-3">
            {[
              { label: 'Name', val: name, set: v => { setName(v); setSlug(v.toLowerCase().replace(/\s+/g, '-')); } },
              { label: 'Slug (URL)', val: slug, set: setSlug },
              { label: 'Description', val: desc, set: setDesc },
            ].map(f => (
              <div key={f.label}>
                <label className="text-xs font-sans text-gray-500 tracking-wider block mb-1">{f.label.toUpperCase()}</label>
                <input value={f.val} onChange={e => f.set(e.target.value)}
                  className="w-full border border-gray-200 px-3 py-2 text-sm font-sans focus:border-maroon focus:outline-none" />
              </div>
            ))}
            <button type="submit" className="btn-maroon w-full">Add Category</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AddProduct({ onSaved }) {
  const [cats, setCats] = useState([]);
  const [files, setFiles] = useState([]);
  const [form, setForm] = useState({
    name: '', description: '', price: '', mrp: '', stock: '',
    category_id: '', material: '', occasion: '', weight: '',
    sizes: '', colors: '', is_featured: false, tags: ''
  });

  useEffect(() => { getCategories().then(r => setCats(r.data)).catch(() => {}); }, []);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async e => {
    e.preventDefault();
    const fd = new FormData();
    const data = {
      ...form,
      sizes:  form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(s => s.trim()).filter(Boolean),
      tags:   form.tags.split(',').map(s => s.trim()).filter(Boolean),
    };
    Object.entries(data).forEach(([k, v]) => {
      fd.append(k, typeof v === 'object' ? JSON.stringify(v) : v);
    });
    files.forEach(f => fd.append('images', f));
    try {
      await createProduct(fd);
      toast.success('Product created!');
      onSaved();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed');
    }
  };

  const F = ({ label, name, type = 'text', required = false }) => (
    <div>
      <label className="text-xs font-sans text-gray-500 tracking-wider block mb-1">{label.toUpperCase()}</label>
      <input type={type} value={form[name]} onChange={e => set(name, e.target.value)} required={required}
        className="w-full border border-gray-200 px-3 py-2 text-sm font-sans focus:border-maroon focus:outline-none" />
    </div>
  );

  return (
    <div>
      <h2 className="font-serif text-maroon text-2xl mb-6">Add Product</h2>
      <form onSubmit={handleSubmit} className="bg-white border border-gold/20 p-6 max-w-2xl space-y-4">
        <F label="Product Name" name="name" required />
        <div>
          <label className="text-xs font-sans text-gray-500 tracking-wider block mb-1">DESCRIPTION</label>
          <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
            className="w-full border border-gray-200 px-3 py-2 text-sm font-sans focus:border-maroon focus:outline-none resize-none" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <F label="Price (₹)" name="price" type="number" required />
          <F label="MRP (₹)" name="mrp" type="number" />
          <F label="Stock" name="stock" type="number" />
          <div>
            <label className="text-xs font-sans text-gray-500 tracking-wider block mb-1">CATEGORY</label>
            <select value={form.category_id} onChange={e => set('category_id', e.target.value)} required
              className="w-full border border-gray-200 px-3 py-2 text-sm font-sans focus:border-maroon focus:outline-none">
              <option value="">Select category</option>
              {cats.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <F label="Material" name="material" />
          <F label="Occasion" name="occasion" />
          <F label="Weight" name="weight" />
        </div>
        <F label="Sizes (comma separated e.g. 2/4, 2/6, 2/8)" name="sizes" />
        <F label="Colors (comma separated)" name="colors" />
        <F label="Tags (comma separated)" name="tags" />
        <div>
          <label className="text-xs font-sans text-gray-500 tracking-wider block mb-1">IMAGES (up to 8)</label>
          <input type="file" multiple accept="image/*" onChange={e => setFiles(Array.from(e.target.files))}
            className="text-sm font-sans text-gray-600" />
          {files.length > 0 && <p className="text-xs text-gray-400 mt-1">{files.length} file(s) selected</p>}
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={form.is_featured} onChange={e => set('is_featured', e.target.checked)}
            className="accent-maroon" />
          <span className="text-sm font-sans text-gray-600">Feature on homepage</span>
        </label>
        <div className="flex gap-4">
          <button type="submit" className="btn-maroon flex-1">Save Product</button>
          <button type="button" onClick={onSaved} className="btn-outline-gold border-gray-300 text-gray-500 flex-1 hover:bg-gray-50">Cancel</button>
        </div>
      </form>
    </div>
  );
}

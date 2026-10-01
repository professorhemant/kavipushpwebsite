import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder, createRazorpayOrder, verifyPayment, confirmPayment } from '../api';
import toast from 'react-hot-toast';

export default function Checkout() {
  const { items, total, shipping, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    address_line1: '', address_line2: '', city: '', state: '', pincode: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePay = async (e) => {
    e.preventDefault();
    if (!items.length) { toast.error('Your cart is empty'); return; }
    setLoading(true);
    try {
      // Create order in DB
      const { data: { order_id, total: grandTotal } } = await createOrder({
        ...form,
        items: items.map(i => ({
          product_id: i.product_id, name: i.name, image: i.image,
          price: i.price, qty: i.qty, size: i.size, color: i.color
        })),
        payment_method: 'razorpay'
      });

      // Create Razorpay order
      const { data: rzpOrder } = await createRazorpayOrder(grandTotal);

      const opts = {
        key:         import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount:      rzpOrder.amount,
        currency:    'INR',
        name:        'Kavipushp',
        description: 'Bridal Jewellery Order',
        order_id:    rzpOrder.id,
        prefill:     { name: form.customer_name, email: form.customer_email, contact: form.customer_phone },
        theme:       { color: '#6B0F0F' },
        handler: async (response) => {
          try {
            await verifyPayment(response);
            await confirmPayment(order_id, {
              razorpay_order_id:   response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id
            });
            clearCart();
            toast.success('Order placed successfully!');
            navigate(`/order-success?order=${order_id}`);
          } catch {
            toast.error('Payment verification failed. Contact us on WhatsApp.');
          }
        }
      };
      const rzp = new window.Razorpay(opts);
      rzp.open();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ label, name, type = 'text', required = true, half = false }) => (
    <div className={half ? 'col-span-1' : 'col-span-2'}>
      <label className="block text-xs font-sans font-medium text-gray-600 mb-1 tracking-wider">
        {label.toUpperCase()} {required && <span className="text-red-400">*</span>}
      </label>
      <input type={type} value={form[name]} onChange={e => set(name, e.target.value)}
        required={required}
        className="w-full border border-gray-300 px-3 py-2.5 text-sm font-sans focus:border-maroon focus:outline-none focus:ring-1 focus:ring-maroon/20 transition-colors"
      />
    </div>
  );

  const grandTotal = total + shipping;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-serif text-maroon text-4xl mb-8">Checkout</h1>
      <form onSubmit={handlePay} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Shipping form */}
        <div className="lg:col-span-2">
          <h3 className="font-serif text-maroon text-xl mb-4">Shipping Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Full Name"    name="customer_name" />
            <Field label="Phone"        name="customer_phone" type="tel" />
            <Field label="Email"        name="customer_email" type="email" required={false} />
            <Field label="Address"      name="address_line1" />
            <Field label="Landmark / Area" name="address_line2" required={false} />
            <Field label="City"         name="city" half />
            <Field label="State"        name="state" half />
            <Field label="Pincode"      name="pincode" half />
          </div>
        </div>

        {/* Order summary */}
        <div className="bg-cream-dark border border-gold/20 p-6 h-fit">
          <h3 className="font-serif text-maroon text-xl mb-4">Order Summary</h3>
          <div className="space-y-3 mb-4">
            {items.map(i => (
              <div key={i.key} className="flex justify-between text-sm font-sans text-gray-600">
                <span className="flex-1 line-clamp-1">{i.name} × {i.qty}</span>
                <span className="ml-2">₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-gold/20 pt-3 space-y-2 font-sans text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{total.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-medium text-base pt-2 border-t border-gold/20">
              <span>Total</span>
              <span className="font-serif text-maroon text-lg">₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="btn-maroon w-full mt-6 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />Processing...</>
            ) : (
              <>Pay ₹{grandTotal.toLocaleString('en-IN')} →</>
            )}
          </button>
          <p className="text-xs text-gray-400 font-sans text-center mt-3">Secured by Razorpay</p>
        </div>
      </form>
    </div>
  );
}

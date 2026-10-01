import { Link, useSearchParams } from 'react-router-dom';
export default function OrderSuccess() {
  const [p] = useSearchParams();
  return (
    <div className="max-w-xl mx-auto px-4 py-24 text-center">
      <div className="text-6xl mb-6">✦</div>
      <h1 className="font-serif text-maroon text-4xl mb-3">Order Confirmed!</h1>
      <p className="text-gray-600 font-sans mb-2">Thank you for shopping with Kavipushp.</p>
      {p.get('order') && (
        <p className="text-gray-500 font-sans text-sm mb-8">Order ID: <strong>{p.get('order')}</strong></p>
      )}
      <p className="text-gray-500 font-sans text-sm mb-8">
        We'll process your order shortly. For any queries, reach us on WhatsApp.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/" className="btn-maroon">Continue Shopping</Link>
        <a href="https://wa.me/91XXXXXXXXXX" target="_blank" rel="noreferrer"
           className="btn-outline-gold border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
          WhatsApp Us
        </a>
      </div>
    </div>
  );
}

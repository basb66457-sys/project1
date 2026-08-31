// Header displayed across all application pages
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Header() {
  const { cartItems, totalItems, removeFromCart, isCartOpen, toggleCart, closeCart } = useCart();

  // Close the cart when Escape is pressed
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === 'Escape') {
        closeCart();
      }
    }

    if (isCartOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isCartOpen, closeCart]);

  return (
    <header className="relative flex items-center justify-between bg-blue-600 px-5 py-4 text-white">
      <Link to="/" className="text-xl font-bold text-white no-underline">Product Dashboard</Link>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-2 border-0 bg-transparent text-2xl text-white"
        aria-label="سلة المشتريات"
        aria-expanded={isCartOpen}
        onClick={toggleCart}
      >
        <span aria-hidden="true">🛒</span>
        <span className="min-w-6 rounded-full bg-white px-1.5 py-0.5 text-center text-sm text-blue-700">{totalItems}</span>
      </button>
      <div
        className={`fixed inset-0 z-40 bg-black/50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        aria-hidden={!isCartOpen}
        onClick={closeCart}
      />
      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-full max-w-sm overflow-y-auto bg-white p-5 text-slate-900 shadow-xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'pointer-events-none translate-x-full'}`}
        aria-hidden={!isCartOpen}
      >
        <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
          <h2 className="m-0 text-lg font-bold">سلة المشتريات</h2>
          <button type="button" onClick={closeCart} aria-label="إغلاق السلة" className="rounded-md p-2 text-2xl leading-none text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">×</button>
        </div>
        {cartItems.length === 0 ? (
          <p>السلة فارغة</p>
        ) : (
          <ul className="m-0 list-none p-0">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-2 border-b border-slate-200 py-3">
                <span>{item.title} - الكمية: {item.quantity}</span>
                <button type="button" onClick={() => removeFromCart(item.id)} className="h-fit bg-red-700 px-2 py-1 text-white transition hover:bg-red-800">حذف</button>
              </li>
            ))}
          </ul>
        )}
      </aside>
    </header>
  );
}

export default Header;
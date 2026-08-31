// =====================================================
// pages/Home.jsx
// Home page: fetches and displays products from the API
// =====================================================
import { useState, useEffect } from 'react';
import { fetchProducts, fetchCategories } from '../api/products';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Home() {
  // Three states: loading, error, and success
  const [products, setProducts] = useState([]); // Product list
  const [loading, setLoading] = useState(true); // Whether the request is in progress
  const [error, setError] = useState(null);     // Error message, if any
  const [categories, setCategories] = useState([]); // Available categories
  const [searchText, setSearchText] = useState(''); // Search text
  const [selectedCategory, setSelectedCategory] = useState('all'); // Selected category
  const { addToCart } = useCart();

  // Run this code once when the page loads
  // (The empty array [] means it will not run on every update)
  useEffect(() => {
    // Define an inner function because async cannot be passed directly to useEffect
    async function loadProducts() {
      try {
        // Fetch products from the API
        const [data, categoryData] = await Promise.all([
          fetchProducts(),
          fetchCategories(),
        ]);
        // The API returns an object containing an array named products
        setProducts(data.products);
        setCategories(Array.isArray(categoryData) ? categoryData : categoryData.categories || []);
      } catch (err) {
        // Handle request failures such as network or server errors
        console.error('Failed to fetch products:', err);
        setError('تعذر تحميل المنتجات. تأكد من اتصالك بالإنترنت ثم أعد المحاولة.');
      } finally {
        // Hide the loading message in all cases, whether successful or failed
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  // 1) Loading state: show a temporary message
  if (loading) {
    return <p className="py-8 text-center text-slate-700">جاري التحميل...</p>;
  }

  // 2) Error state: show a clear message to the user
  if (error) {
    return <p className="py-8 text-center font-semibold text-red-700">{error}</p>;
  }

  // Filter locally using the products that were already loaded
  const filteredProducts = products.filter((product) => {
    const matchesName = product.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesName && matchesCategory;
  });

  // 3) Success state: show the product list
  return (
    <div>
      <h1 className="mb-6 text-3xl font-bold text-slate-900">قائمة المنتجات</h1>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 font-semibold text-slate-700">
          <span>البحث بالاسم</span>
          <input
            type="search"
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="اكتب اسم المنتج"
            className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
          />
        </label>
        <label className="grid gap-2 font-semibold text-slate-700">
          <span>الفئة</span>
          <select value={selectedCategory} onChange={(event) => setSelectedCategory(event.target.value)} className="rounded-md border border-slate-300 bg-white px-3 py-2 font-normal outline-none transition focus:border-blue-600 focus:ring-2 focus:ring-blue-200">
            <option value="all">كل الفئات</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>{category.name}</option>
            ))}
          </select>
        </label>
      </div>

      <ul className="grid list-none grid-cols-1 gap-6 p-0 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <li key={product.id} className="overflow-hidden rounded-lg bg-white pb-3 shadow-sm transition-shadow hover:shadow-md">
            <Link to={`/product/${product.id}`} className="text-inherit no-underline">
              <img src={product.thumbnail} alt={product.title} className="aspect-[4/3] block w-full object-cover" />
              <div className="p-3">
                <h2 className="mb-2 text-base font-semibold text-slate-900">{product.title}</h2>
                <p className="my-1 font-bold text-blue-700">السعر: ${product.price}</p>
                <p className="my-1 text-sm text-slate-600">التقييم: {product.rating} / 5</p>
              </div>
            </Link>
            <button type="button" onClick={() => addToCart(product)} className="mx-3 rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700">أضف للسلة</button>
          </li>
        ))}
      </ul>
      {filteredProducts.length === 0 && <p className="text-center font-semibold text-slate-700">لا توجد نتائج</p>}
    </div>
  );
}

export default Home;
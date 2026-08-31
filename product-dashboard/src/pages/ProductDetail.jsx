// Single product details page
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchProductById } from '../api/products';
import { useCart } from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        console.error('Failed to fetch product details:', err);
        setError('تعذر تحميل تفاصيل المنتج. تأكد من اتصالك بالإنترنت ثم أعد المحاولة.');
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  if (loading) return <p className="py-8 text-center text-slate-700">جاري التحميل...</p>;
  if (error) return <p className="py-8 text-center font-semibold text-red-700">{error}</p>;

  return (
    <article className="grid gap-7 rounded-lg bg-white p-6 md:grid-cols-2">
      <Link to="/" className="text-blue-700 underline md:col-span-2">العودة إلى المنتجات</Link>
      <img src={product.thumbnail} alt={product.title} className="aspect-square w-full max-h-[420px] object-contain" />
      <div className="text-slate-700">
        <p className="text-slate-500">الفئة: {product.category}</p>
        <h1 className="my-3 text-3xl font-bold text-slate-900">{product.title}</h1>
        <p className="font-bold text-blue-700">السعر: ${product.price}</p>
        <p className="my-2 text-slate-600">التقييم: {product.rating} / 5</p>
        <p className="leading-7">{product.description}</p>
        <p className="my-4">حالة المخزون: {product.stock > 0 ? `متوفر (${product.stock})` : 'غير متوفر'}</p>
        <button type="button" onClick={() => addToCart(product)} disabled={product.stock === 0} className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400">
          أضف للسلة
        </button>
      </div>
    </article>
  );
}

export default ProductDetail;
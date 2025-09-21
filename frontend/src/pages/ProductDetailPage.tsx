import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

function ProductDetailPage() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product');
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="max-w-5xl mx-auto p-6 text-gray-500">Loading...</div>;
  }

  if (!product) {
    return <div className="max-w-5xl mx-auto p-6 text-red-600">Product not found.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img src={product.image} alt={product.name} className="w-full h-96 object-cover rounded" />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <div className="text-green-600 text-2xl font-semibold mb-4">${product.price.toFixed(2)}</div>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <div className="text-sm text-gray-600 mb-6 space-y-1">
            <div>Category: <span className="capitalize">{product.category}</span></div>
            <div>Difficulty: {product.difficulty}</div>
            <div>Light: {product.light_requirements}</div>
            <div>Watering: {product.watering_frequency}</div>
            {product.stock > 0 ? (
              <div>In stock: {product.stock}</div>
            ) : (
              <div className="text-red-600">Out of stock</div>
            )}
          </div>

          <button
            onClick={() => addItem({ id: product._id, name: product.name, price: product.price, image: product.image, maxQuantity: product.stock })}
            disabled={product.stock === 0}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;



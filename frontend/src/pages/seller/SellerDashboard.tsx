import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useProducts, Product } from '../../contexts/ProductContext';

function SellerDashboard() {
  const { user } = useAuth();
  const { fetchSellerProducts } = useProducts();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSeller, setIsSeller] = useState(false);

  useEffect(() => {
    if (user?.is_seller) {
      loadProducts();
    }
  }, [user]);

  const loadProducts = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const sellerProducts = await fetchSellerProducts(user.id);
      setProducts(sellerProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const becomeSeller = async () => {
    if (!user) return;
    try {
      // This will be handled by the AuthContext updateUser function
      setIsSeller(true);
      // Refresh user context
      window.location.reload();
    } catch (error) {
      console.error('Error becoming seller:', error);
    }
  };

  if (!user) {
    return <div className="max-w-4xl mx-auto p-6">Please sign in to access seller dashboard.</div>;
  }

  if (!user.is_seller && !isSeller) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Become a Seller</h1>
        <p className="mb-6">Start selling your plants on our platform!</p>
        <button
          onClick={becomeSeller}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Become a Seller
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">My Products</h1>
        <Link
          to="/seller/add-product"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Product
        </Link>
      </div>

      {loading ? (
        <div className="text-gray-500">Loading your products...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 mb-4">You haven't added any products yet.</p>
          <Link
            to="/seller/add-product"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Your First Product
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-green-600 font-bold">${product.price.toFixed(2)}</span>
                  <span className="text-sm text-gray-500">Stock: {product.stock}</span>
                </div>
                <div className="flex space-x-2">
                  <Link
                    to={`/seller/edit-product/${product.id}`}
                    className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-center text-sm hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => {
                      if (confirm('Are you sure you want to delete this product?')) {
                        // Handle delete
                      }
                    }}
                    className="flex-1 bg-red-600 text-white py-2 px-3 rounded text-sm hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SellerDashboard;

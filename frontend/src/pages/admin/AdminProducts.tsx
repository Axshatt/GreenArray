import { useState } from 'react';
import { useProducts, Product } from '../../contexts/ProductContext';

function AdminProducts() {
  const { products, addProduct, deleteProduct } = useProducts();
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await deleteProduct(id);
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setSeedLoading(true);
    const demo: Omit<Product, 'id' | 'created_at'>[] = [
      {
        name: 'Monstera Deliciosa',
        description: 'Iconic split leaves, fast-growing and easy to care for.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1614594853490-1a53e2e6ed0a?q=80&w=1200&auto=format&fit=crop',
        category: 'indoor',
        stock: 12,
        featured: true,
        difficulty: 'Easy',
        light_requirements: 'Medium',
        watering_frequency: 'Weekly'
      },
      {
        name: 'Snake Plant',
        description: 'Very tolerant, thrives on neglect and low light.',
        price: 19.99,
        image: 'https://images.unsplash.com/photo-1614594853893-09d3f7bab5d7?q=80&w=1200&auto=format&fit=crop',
        category: 'indoor',
        stock: 20,
        featured: false,
        difficulty: 'Easy',
        light_requirements: 'Low',
        watering_frequency: 'Bi-weekly'
      },
      {
        name: 'Fiddle Leaf Fig',
        description: 'Statement plant with large violin-shaped leaves.',
        price: 49.99,
        image: 'https://images.unsplash.com/photo-1614594853974-3750ab8f67be?q=80&w=1200&auto=format&fit=crop',
        category: 'indoor',
        stock: 5,
        featured: true,
        difficulty: 'Medium',
        light_requirements: 'High',
        watering_frequency: 'Weekly'
      }
    ];

    try {
      for (const p of demo) {
        await addProduct(p);
      }
    } finally {
      setSeedLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Products</h1>
        <button
          onClick={handleSeed}
          disabled={seedLoading}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-60"
        >
          {seedLoading ? 'Seeding...' : 'Seed Demo Products'}
        </button>
      </div>

      <table className="w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-gray-50">
          <tr className="text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Price</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Category</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id} className="border-t">
              <td className="p-3">{p.name}</td>
              <td className="p-3">${p.price.toFixed(2)}</td>
              <td className="p-3">{p.stock}</td>
              <td className="p-3 capitalize">{p.category}</td>
              <td className="p-3">
                <button
                  onClick={() => handleDelete(p.id)}
                  disabled={loading}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminProducts;



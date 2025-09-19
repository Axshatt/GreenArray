import React from "react"
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';

function useQuery() {
  const { search } = useLocation();
  return useMemo(() => new URLSearchParams(search), [search]);
}

function ProductsPage() {
  const { products, loading } = useProducts();
  const query = useQuery();
  const searchTerm = query.get('search')?.toLowerCase() || '';

  const filtered = useMemo(() => {
    if (!searchTerm) return products;
    return products.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.description.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }, [products, searchTerm]);

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex items-baseline justify-between mb-6">
        <h1 className="text-2xl font-bold">Plants</h1>
        <div className="text-sm text-gray-500">{filtered.length} items</div>
      </div>

      {loading ? (
        <div className="py-16 text-center text-gray-500">Loading plants...</div>
      ) : filtered.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No plants found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductsPage;



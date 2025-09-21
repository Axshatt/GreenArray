
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
  difficulty: string;
  light_requirements: string;
  watering_frequency: string;
  seller?: string;
  created_at: string;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (product: Omit<Product, '_id' | 'created_at'>) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchSellerProducts: (sellerId: string) => Promise<Product[]>;
  getProductById: (id: string) => Promise<Product | null>;
  searchProducts: (query: string) => Promise<Product[]>;
  getProductsByCategory: (category: string) => Promise<Product[]>;
  getFeaturedProducts: () => Promise<Product[]>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    try {
  const res = await api.get('https://greenarray-1.onrender.com/api/products');
      // Ensure products is always an array
      if (Array.isArray(res.data)) {
        setProducts(res.data);
      } else if (res.data && typeof res.data === 'object') {
        setProducts([res.data]);
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (product: Omit<Product, '_id' | 'created_at'>) => {
    setLoading(true);
    try {
  const res = await api.post('https://greenarray-1.onrender.com/api/products', product);
      setProducts(prev => [res.data, ...prev]);
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id: string, product: Partial<Product>) => {
    setLoading(true);
    try {
  const res = await api.put(`https://greenarray-1.onrender.com/api/products/${id}`, product);
      setProducts(prev => prev.map(p => p._id === id ? res.data : p));
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id: string) => {
    setLoading(true);
    try {
  await api.delete(`api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const fetchSellerProducts = async (sellerId: string): Promise<Product[]> => {
    setLoading(true);
    try {
  const res = await api.get(`api/products?seller=${sellerId}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching seller products:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (id: string): Promise<Product | null> => {
    setLoading(true);
    try {
  const res = await api.get(`api/products/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const searchProducts = async (query: string): Promise<Product[]> => {
    setLoading(true);
    try {
  const res = await api.get(`api/products?search=${encodeURIComponent(query)}`);
      return res.data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getProductsByCategory = async (category: string): Promise<Product[]> => {
    setLoading(true);
    try {
  const res = await api.get(`api/products?category=${encodeURIComponent(category)}`);
      return res.data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const getFeaturedProducts = async (): Promise<Product[]> => {
    setLoading(true);
    try {
  const res = await api.get('api/products?featured=true');
      return res.data;
    } catch (error) {
      console.error('Error fetching featured products:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const value = {
    products,
    loading,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    fetchSellerProducts,
    getProductById,
    searchProducts,
    getProductsByCategory,
    getFeaturedProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};
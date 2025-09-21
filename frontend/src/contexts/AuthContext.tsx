

import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../lib/api';

interface User {
  _id: string;
  email: string;
  fullName: string;
  is_admin: boolean;
  is_seller: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getAllUsers: () => Promise<User[]>;
  updateUserRole: (userId: string, isAdmin: boolean, isSeller: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('token');
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('token', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
  const res = await api.post('https://greenarray-1.onrender.com/api/auth/signin', { email, password });
      setUser(res.data.user);
      // Save is_seller in localStorage
      localStorage.setItem('token', JSON.stringify({ ...res.data.user, is_seller: res.data.user.is_seller }));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    setLoading(true);
    try {
  const res = await api.post('https://greenarray-1.onrender.com/api/auth/signup', {
        email,
        password,
        fullname: fullName,
      });
      setUser(res.data.user);
      // Save is_seller in localStorage
      localStorage.setItem('token', JSON.stringify({ ...res.data.user, is_seller: res.data.user.is_seller }));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    localStorage.removeItem('token');
    // Optionally, call backend to invalidate session
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    setLoading(true);
    try {
  const res = await api.put('api/auth/profile', updates);
      setUser(res.data.user);
      // Save is_seller in localStorage
      localStorage.setItem('user', JSON.stringify({ ...res.data.user, is_seller: res.data.user.is_seller }));
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
  await api.delete(`api/auth/profile/${userId}`);
      setUser(null);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getAllUsers = async (): Promise<User[]> => {
    setLoading(true);
    try {
  const res = await api.get('https://greenarray-1.onrender.com/api/auth/users');
      return res.data.users;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: string, isAdmin: boolean, isSeller: boolean) => {
    setLoading(true);
    try {
  await api.put(`api/auth/role/${userId}`, { is_admin: isAdmin, is_seller: isSeller });
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateUser,
    deleteUser,
    getAllUsers,
    updateUserRole,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
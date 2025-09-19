

import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

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
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  // Example: fetch user from localStorage or backend
  useEffect(() => {
    // TODO: Implement session persistence if needed
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log(email);
    
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signin', { email, password });
      setUser(res.data.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
       console.log(email);
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
        fullname: fullName,
      });
      setUser(res.data.user);
      console.log(res.data.user);
      
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    setUser(null);
    // Optionally, call backend to invalidate session
  };

  const updateUser = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');
    setLoading(true);
    try {
      const res = await axios.put(`/api/auth/profile`, updates);
      setUser(res.data.user);
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string) => {
    setLoading(true);
    try {
      await axios.delete(`http://localhost:5000/api/auth/profile/${userId}`);
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
      const res = await axios.get('/api/auth/users');
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
      await axios.put(`/api/auth/role/${userId}`, { is_admin: isAdmin, is_seller: isSeller });
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
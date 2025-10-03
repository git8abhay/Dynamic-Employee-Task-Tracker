import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, logoutUser, onAuthChange } from '../api/auth';

const AuthContext = createContext();

// Custom hook for easy access
export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthChange(async (firebaseUser) => {
      if (firebaseUser) {
        // Apply role logic here, derived from API/Firestore in a real app
        const role = firebaseUser.email.includes('admin') ? 'admin' : 'employee';
        setUser({ ...firebaseUser, role });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    return loginUser(email, password);
  };

  const register = async (email, password) => {
    return registerUser(email, password);
  };

  const logout = async () => {
    return logoutUser();
  };

  const value = { user, login, logout, register, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Only render children once initial authentication check is done */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
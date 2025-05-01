import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // To handle initial token check
  const [loading, setLoading] = useState(true);

  const TOKEN_STORAGE_KEY = 'jwtToken';

   // Function to store the token securely (localStorage, with XSS considerations)
   const storeToken = (token) => {
    // For production, HttpOnly cookies are strongly recommended.
    // localStorage is susceptible to XSS attacks.
    // Consider setting an expiration time for the token and clearing it.
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  };

  // Function to retrieve the token
  const getToken = () => {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  };

  // Function to remove the token (e.g., on logout)
  const removeToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  };

  const login = async (token, userData = null) => {
    storeToken(token);
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setIsLoggedIn(false);
    setUser(null);
  };

    useEffect(() => {
      const token = getToken();
      if (token) {
        setIsLoggedIn(true);
      }
      setLoading(false);
    }, []);


  return (
    <AuthContext.Provider value={{ user, isLoggedIn, loading, login, logout, getToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
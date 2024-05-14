// AuthContext.js
import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const login=()=>{setIsLoggedIn(true)}
  const logOut=()=>{setIsLoggedIn(false)}

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

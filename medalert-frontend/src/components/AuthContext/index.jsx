import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {ACCESS_TOKEN, REFRESH_TOKEN, GOOGLE_ACCESS_TOKEN} from "../../token";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem(ACCESS_TOKEN) || null);
  const navigate = useNavigate();

  // Função para realizar login
  const login = (token) => {
    setToken(token);
    localStorage.setItem(ACCESS_TOKEN, token);
  };

  // Função para logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem(ACCESS_TOKEN);
    navigate("/login"); // Redireciona para a página de login
  };

  useEffect(() => {
    if (!token) {
      navigate("/login"); // Redireciona caso não esteja autenticado
    }
  }, [token, navigate]);

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

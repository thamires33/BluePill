import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const navigate = useNavigate();

  // Função para realizar login
  const login = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  // Função para logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
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

import React from "react";
import { useNavigate } from "react-router-dom"; // Importa o hook de navegação

const CTA = () => {
  const navigate = useNavigate(); // Hook de navegação

  // Função para redirecionar para a página de cadastro
  const handleRegister = () => {
    navigate("/register"); // Redireciona para a página de cadastro
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f7f7f7", borderRadius: "8px" }}>
      <h2 style={{ color: "#333", marginBottom: "10px" }}>Gostaria de Cadastrar?</h2>
      <p style={{ color: "#666", marginBottom: "20px" }}>
        Cadastre-se para ter acesso a conteúdos exclusivos.
      </p>
      <button
        onClick={handleRegister}
        style={{
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        CADASTRAR
      </button>
    </div>
  );
};

export default CTA;

import React from "react";
import { useNavigate } from "react-router-dom";

const CTA = () => {
  const navigate = useNavigate();

  const handleCadastroClick = () => {
    navigate("/cadastro"); // navegando para a rota de Cadastro
  };

  const handleLoginClick = () => {
    navigate("/"); // navegando para a rota de login
  };

  if (window.location.pathname === "/cadastro") {
    return (
      <>
        <h2>Já é cadastrado?</h2>
        <p>Faça login para acessar conteúdos exclusivos</p>
        <button onClick={handleLoginClick}>LOGIN</button>
      </>
    );
  }

  else {
    return (
      <>
        <h2>Gostaria de Cadastrar?</h2>
        <p>Cadastre-se para ter acesso a conteúdos exclusivos</p>
        <button onClick={handleCadastroClick}>CADASTRAR</button>
      </>
    );
  };

  }


export default CTA;

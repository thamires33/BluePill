import React from "react";
import styled from "styled-components";

const FormLogin = () => {
  return (
    <form>
      <InputField type="text" placeholder="Username" />
      <InputField type="password" placeholder="Password" />
      <SubmitButton type="submit">Login</SubmitButton>
      
      {/* Botão de login com Google */}
      <GoogleButton type="button">Entrar com o Google</GoogleButton>

      <ForgotPasswordLink href="#">Esqueceu a senha?</ForgotPasswordLink>
    </form>
  );
};

const InputField = styled.input`
  padding: 10px;
  margin-bottom: 15px;  // Espaçamento entre os campos
  width: 100%;          // Para os campos ocuparem a largura total
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #64b5c5;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;  // Ocupa a largura total do contêiner
  margin-top: 10px;

  &:hover {
    background-color: #4a93a5;
  }
`;

// Estilo para o botão de login com Google
const GoogleButton = styled.button`
  padding: 10px 20px;
  background-color: #db4437;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;  // Ocupa a largura total do contêiner
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #c1351d;
  }

  span {
    margin-left: 10px;  // Espaçamento entre ícone e texto
  }
`;

const ForgotPasswordLink = styled.a`
  text-align: center;
  color: #64b5c5;
  text-decoration: none;
  font-size: 14px;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

export default FormLogin;

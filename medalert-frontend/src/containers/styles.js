import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: flex-start;  // Alinha o conteúdo no topo
  justify-content: center;
  min-height: 100vh;  // Isso vai garantir que o conteúdo ocupe a altura total da tela, mas ainda tenha flexibilidade
  background-color: #d0e9f7;
  padding-top: 50px;  // Adiciona espaçamento no topo para empurrar o conteúdo para baixo
`;

export const LoginBox = styled.div`
  display: flex;
  background: white;
  width: 100%;
  max-width: 900px;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
  margin-top: 50px;  // Adiciona margem superior ao LoginBox para garantir que o conteúdo não fique colado no topo da tela
`;

export const LeftSection = styled.div`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    text-align: center;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;  // Alinha os campos verticalmente
    align-items: center;
    gap: 20px; 
       // Os campos ocuparão toda a largura disponível
  }

  a {
    text-align: center;
    color: #006da5;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  background: gray;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  color: white;

  h2 {
    margin-bottom: 10px;
    font-size: 20px;
  }

  p {
    text-align: center;
    font-size: 14px;
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: white;
    color: #006da5;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s;

    &:hover {
      background-color: #f5f5f5;
    }
  }
`;

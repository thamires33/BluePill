import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #d0e9f7;
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
    color: #64b5c5;
    text-decoration: none;
    font-size: 14px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const RightSection = styled.div`
  flex: 1;
  background: url("https://via.placeholder.com/400") no-repeat center center;
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
    color: #64b5c5;
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


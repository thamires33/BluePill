import React from 'react';
import styled from 'styled-components';

const GoogleButton = () => {
  return (
    <Button>
      <GoogleIcon
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
        alt="Google logo"
      />
      Login with Google
    </Button>
  );
};

// Estilos para o botão de login com o Google
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  background-color: #4285f4;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  width: 100%;
  max-width: 300px;
  margin-top: 20px;
  font-weight: bold;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #357ae8;
  }
`;

const GoogleIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

export default GoogleButton;

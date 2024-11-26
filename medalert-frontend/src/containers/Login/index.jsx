import React from "react";
import { Container, LoginBox, LeftSection, RightSection } from "./styles";
import FormLogin from "../../components/FormLogin";
import SocialIcons from "../../components/SocialIcons";
import CTA from "../../components/CTA";

const Login = () => {
  return (
    <Container>
      <LoginBox className="row">
        {/* Seção Esquerda */}
        <LeftSection className="col-lg-6 col-md-6 col-sm-12">
          <FormLogin /> {/* Componente que contém o formulário de login */}
          <SocialIcons /> {/* Componente para os ícones de login social (Google, Facebook, etc.) */}
        </LeftSection>

        {/* Seção Direita */}
        <RightSection className="col-lg-6 col-md-6 col-sm-12">
          <CTA /> {/* Componente de chamada à ação, como informações adicionais ou links */}
        </RightSection>
      </LoginBox>
    </Container>
  );
};

export default Login;

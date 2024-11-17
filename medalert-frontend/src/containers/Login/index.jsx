import React from "react";
import { Container, LoginBox, LeftSection, RightSection } from "./styles";
import FormLogin from "../../components/FormLogin";
import SocialIcons from "../../components/SocialIcons";
import CTA from "../../components/CTA";

const Login = () => {
  return (
    <Container>
      <LoginBox className="row">
        <LeftSection className="col-lg-6 col-md-6 col-sm-12">
          <h1>Logar</h1>
          <FormLogin />
          <SocialIcons />
        </LeftSection>
        <RightSection className="col-lg-6 col-md-6 col-sm-12">
          <CTA />
        </RightSection>
      </LoginBox>
    </Container>
  );
};

export default Login;

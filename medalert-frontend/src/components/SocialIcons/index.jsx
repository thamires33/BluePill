import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import styled from "styled-components";

const IconsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  svg {
    font-size: 24px;
    cursor: pointer;
    color: #777;
    transition: color 0.3s;

    &:hover {
      color: #64b5c5;
    }
  }
`;

const SocialIcons = () => {
  return (
    <IconsContainer>
      <FaFacebook />
      <FaTwitter />
      <FaLinkedin />
      <FaInstagram />
    </IconsContainer>
  );
};

export default SocialIcons;

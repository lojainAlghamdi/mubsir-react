import React from "react";
import {
  Container,
  Footer,
  Copyright,
  Title,
  DeveloperList,
  Slogan,
  DeveloperLink
} from "./ContactUs.styles";

function ContactUs() {
  return (
    <div id="contact-us">
      <Container>
        <Title>Developed by</Title>
        <DeveloperList>
          <DeveloperLink href="https://x.com/_ghadaa112" target="_blank" rel="noopener noreferrer">
            Ghada Allaythi
          </DeveloperLink>
          <DeveloperLink href="https://x.com/xflojain" target="_blank" rel="noopener noreferrer">
            Lojain Alghamdi
          </DeveloperLink>
          <DeveloperLink href="https://x.com/itzrafal_" target="_blank" rel="noopener noreferrer">
            Rafal Fakeera
          </DeveloperLink>
          <DeveloperLink href="https://x.com/Marya_Fawaz" target="_blank" rel="noopener noreferrer">
            Marya Alkanani
          </DeveloperLink>
        </DeveloperList>
        <Slogan>Simplifying Your FCIT Campus Journey</Slogan>
        <Footer />
        <Copyright>Copyright © 2025</Copyright>
      </Container>
    </div>
  );
}

export default ContactUs;
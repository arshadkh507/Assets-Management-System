import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white py-3">
      <Container className="d-flex justify-content-between">
        <span>&copy; 2023. All rights reserved.</span>
        <span>Designed & Developed by Arshad.</span>
      </Container>
    </footer>
  );
};

export default Footer;

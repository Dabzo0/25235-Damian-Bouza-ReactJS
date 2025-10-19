import React from "react";
import {Container, Row, Col} from 'react-bootstrap'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; 
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons"; 


 const Footer=()=> {
    return (
    <footer className="bg-black text-white text-center pt-2">
      <Container>
        <Row>
          <Col md={6} className="text-center pb-2 order-2 order-md-1">            
            <a href="https://maps.app.goo.gl/LwkSGwfHfBnXcZs57" className="text-white fs-5 text-decoration-none text-nowrap" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon icon={faLocationDot} style={{color: "#ffffff",}} size="lg"/>
            Eugenio de Burzaco 250
            </a>          
          </Col>
          <Col md={6} className="text-center pb-2 order-1 order-md-2">
            <a href="https://www.facebook.com/damian.bouza" className="text-white text-decoration-none text-nowrap" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} style={{color: "#ffffff"}} size="2xl"/>
            </a>
            <a href="https://www.instagram.com/damian_b84/" className="text-white text-decoration-none text-nowrap" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} style={{color: "#ffffff"}} size="2xl" />
            </a>
            <a href="https://wa.me/5491164195021" className="text-white text-decoration-none text-nowrap" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faWhatsapp} style={{color: "#ffffff"}} size="2xl" />
            </a>
          </Col>        
        </Row>        
      </Container>
      
      <p className="mb-0 fs-6 text-nowrap">
        &copy; 2025 Todos los derechos reservados.
      </p>
    </footer>
  );
};
export default Footer;
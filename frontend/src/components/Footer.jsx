import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Footer() {
  const date = new Date();
  const newDate = date.getFullYear();
  return (
    <div>
      <footer className="text-center">
        <Container>
          <Row>
            <Col md={4} sm={12}>
              <h3>INFORMATION</h3>
              <hr></hr>
              <p>
                <Link className="footer-link" to="/aboutUs">
                  About Us
                </Link>
              </p>
              <p>
                <Link className="footer-link" to="/shippingPolicy">
                  Shipping Policy
                </Link>
              </p>
              <p>
                <Link className="footer-link" to="/privacyPolicy">
                  Privacy Policy
                </Link>
              </p>
            </Col>
            <Col md={4} sm={12}>
              <h3>CONTACT US</h3>
              <hr></hr>
              <p>+92 302 3325435</p>
              <p>+92 303 7957697</p>
              <p>nomanziakissana@gmail.com</p>
              <p>Street #6 Main Shaikpur Road Faisalabad</p>
            </Col>
            <Col md={4} sm={12}>
              <div className="footer-icon-div">
                <h3>STAY CONNECTED</h3>
                <hr></hr>
                <h5>Follow us</h5>
                <a href="https://www.facebook.com/" target="blank">
                  <i class=" fa-brands fa-facebook fa-2x footer-icon"></i>
                </a>{' '}
                <a
                  className=""
                  href="https://www.instagram.com/"
                  target="blank"
                >
                  <i class="fa-brands fa-instagram fa-2x footer-icon"></i>{' '}
                </a>
                <a href="/" alt="name">
                  {' '}
                  <i class="fa-brands fa-snapchat fa-2x footer-icon"></i>
                </a>
              </div>
            </Col>
          </Row>
          <hr></hr>
          <Row>All right reserved {newDate}</Row>
        </Container>
      </footer>
    </div>
  );
}

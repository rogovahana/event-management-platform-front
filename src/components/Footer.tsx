import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Container, Row, Col } from "react-bootstrap";

function Footeri() {
  return (
    <footer className=" text-white mt-5 p-4" style={{ backgroundColor: "#7848F4" }}>
      <Container>
        <Row>
          <Col className=" d-flex justify-content-center mb-3">
            <a href="#" className=" text-dark mx-3">
              <i className="fab fa-facebook-f fa-2x"></i>
            </a>
            <a href="#" className=" text-dark mx-3">
              <i className="fab fa-twitter fa-2x"></i>
            </a>
            <a href="#" className="text-dark mx-3">
              <i className="fab fa-instagram fa-2x"></i>
            </a>
            
          </Col>
        </Row>
        <hr className=" bg-dark" />
        <Row>
          <Col className=" d-flex justify-content-center mb-3 mt-3">
            <a href="/" className=" text-light mx-3" style={{ textDecoration: "none" }}>
              Home
            </a>
            <a href="#" className="text-light mx-3" style={{ textDecoration: "none" }}>
              Events
            </a>
            <a href="#" className="text-light mx-3" style={{ textDecoration: "none" }}>
              Contact Us
            </a>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className=" text-center">
            <p className=" mb-0">© 2024 Event. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footeri;

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import eventumLogo from "../assets/logo/eventum_logo.png";
import "../components/Navbar.css";

function Navbari() {
  return (
    <Navbar expand="lg" className="bg-dark">
      <Container fluid>
        <Navbar.Brand href="#">
          <img
            src={eventumLogo}
            height="30"
            className="d-inline-block align-top"
            alt="Eventum Logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#events" style={{ color: "orange" }}>
              Events
            </Nav.Link>
            <Nav.Link href="#contact-us" style={{ color: "orange" }}>
              Contact Us
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-warning" className="ms-1 login-btn">
              Login
            </Button>
            <Button variant="warning" className="ms-1">
              Signup
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbari;

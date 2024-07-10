import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../components/Navbar.css";

function Navbari() {
  return (
    <Navbar expand="lg" className="bg-light">
      <Container fluid>
        <Navbar.Brand href="/">
          <span >
            Event<span style={{ color: "#7848F4",}}>Hive</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link href="#events" style={{ color: "#7848F4" }}>
              Events
            </Nav.Link>
            {/* <Nav.Link href="#contact-us" style={{ color: "#7848F4" }}>
              Contact Us
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex">
          <Button variant="outline" style={{ color: "#7848F4" }} className="ms-1 login-btn">
              Login
            </Button>
            <Button variant="primary" style={{ backgroundColor: "#7848F4", borderColor: "#7848F4" }} className="ms-1">
              Signup
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbari;

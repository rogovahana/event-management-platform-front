import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "./Navbar.css";
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

function Navbari() {
  const { theme } = useTheme();

  return (
    <Navbar expand="lg" className={`sticky-top ${theme === 'dark' ? 'navbar-dark bg-dark' : 'navbar-light bg-light'}`}>
      <Container fluid>
        <Navbar.Brand href="/">
          <span>
            Event<span style={{ color: "#7848F4" }}>Hive</span>
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="justify-content-end">
          <Nav className="me-auto">
            <Link to="/browse-events" className="events-link">
              Events
            </Link>
            {/* <Nav.Link href="#contact-us" style={{ color: "#7848F4" }}>
              Contact Us
            </Nav.Link> */}
          </Nav>
          <Form className="d-flex align-items-center">
            <ThemeToggle /> 
            <Link to="/login">
              <Button variant="outline" style={{ color: "#7848F4" }} className="ms-1 login-btn">
                Login
              </Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="primary" style={{ backgroundColor: "#7848F4", borderColor: "#7848F4" }} className="ms-1">
                Signup
              </Button>
            </Link>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbari;
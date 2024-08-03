import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Dropdown } from 'react-bootstrap';
import "./Navbar.css";
import ThemeToggle from '../ThemeToggle';
import { useTheme } from '../../contexts/ThemeContext';

function Navbari() {
  const { theme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth0();

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
          </Nav>
          <Form className="d-flex align-items-center">
            <ThemeToggle />
            {isAuthenticated ? (
              <Dropdown>
                <Dropdown.Toggle variant="outline-primary" id="dropdown-basic" className="ms-1">
                  {user?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/manage-events">Manage Events</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/profile-page">Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to="/my-tickets">My Tickets</Dropdown.Item>
                  <Dropdown.Item onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
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
              </>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbari;

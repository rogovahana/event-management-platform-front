import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Form, Button, Container, Row, Col, Nav } from 'react-bootstrap';
import { Link, Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import Navbari from '../../components/Navbar/Navbar';
import TicketsPage from '../BookTicket/BookedTicketPage';
import './ProfilePage.css';

interface UserProfile {
  username: string;
  email: string;
  phoneNumber: string;
}

const ProfilePage: React.FC = () => {

    // Issues with Authentication
    { /* 
        
  const { isAuthenticated, getAccessTokenSilently, loginWithRedirect, isLoading } = useAuth0();
  const [userProfile, setUserProfile] = useState<UserProfile>({
    username: '',
    email: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('User not authenticated, redirecting to login...');
      sessionStorage.setItem('auth0_appState', JSON.stringify({ returnTo: '/profile-page' }));
      loginWithRedirect({ appState: { returnTo: '/profile-page' } });
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently();
          const response = await fetch('https://localhost:7136/api/User', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }

          const data = await response.json();
          setUserProfile({
            username: data.username,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
        } catch (error) {
          console.error('There was an error fetching the user data!', error);
        }
      }
    };

    fetchUserProfile();
  }, [isAuthenticated, getAccessTokenSilently]);

  useEffect(() => {
    const appState = JSON.parse(sessionStorage.getItem('auth0_appState') || '{}');
    if (isAuthenticated && appState?.returnTo) {
      console.log(`Redirecting to ${appState.returnTo}...`);
      navigate(appState.returnTo);
      sessionStorage.removeItem('auth0_appState');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserProfile(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const token = await getAccessTokenSilently();
      const response = await fetch('https://localhost:7136/api/User', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log('User profile updated successfully!', data);
    } catch (error) {
      console.error('There was an error updating the user profile!', error);
    }
  };

  if (isLoading || !isAuthenticated) {
    return <div>Loading...</div>;
  }

  */ }
  return (
    <>
      <Navbari />
      <Container className="profile-page">
        <Row>
          <Col md={3}>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="/profile-page">Account Information</Nav.Link>
              <Nav.Link as={Link} to="/my-tickets">Tickets</Nav.Link>
            </Nav>
          </Col>
          <Col md={9}>
            <h2>Account Information</h2>
            <Row>
              <Col md={4}>
                <h3>Profile Photo</h3>
                <div className="profile-photo">
                  <p>PROFILE IMAGE</p>
                </div>
              </Col>
              <Col md={8}>
                <h3>Contact Information</h3>
                <Form>
                  <Form.Group as={Row} controlId="formUsername">
                    <Form.Label column sm={2}>Username</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" name="username" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formEmail">
                    <Form.Label column sm={2}>Email</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="email" name="email" />
                    </Col>
                  </Form.Group>

                  <Form.Group as={Row} controlId="formPhoneNumber">
                    <Form.Label column sm={2}>Phone Number</Form.Label>
                    <Col sm={10}>
                      <Form.Control type="text" name="phoneNumber" />
                    </Col>
                  </Form.Group>

                  <Button type="submit" className="save-button">Save Changes</Button>
                </Form>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ProfilePage;
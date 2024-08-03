import React from 'react';
import authService from './AuthService';
import { Button, Container, Row, Col } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  const handleLogin = () => {
    authService.login();
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
        <h2>Log In</h2>
          <Button onClick={handleLogin}>Log In</Button>
        </Col>
      </Row>
    </Container>
  );
};
export default LoginPage;
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const LoginPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Login</h2>
          <Button onClick={() => loginWithRedirect()}>Log In</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
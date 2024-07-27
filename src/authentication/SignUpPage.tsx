import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Container, Row, Col } from 'react-bootstrap';

const SignUpPage: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h2>Sign Up</h2>
          <Button onClick={() => loginWithRedirect({ authorizationParams: { screen_hint: 'signup' } })}/>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUpPage;

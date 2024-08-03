import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = () => {
    // You can add any additional logic here if needed
    loginWithRedirect();
  };

  return (
    <Button
      onClick={handleLogin}
      variant="outline-primary"
      style={{ color: "#7848F4" }}
      className="ms-1 login-btn"
    >
      Log In
    </Button>
  );
};

export default LoginButton;

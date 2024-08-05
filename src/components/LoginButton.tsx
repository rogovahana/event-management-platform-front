import React from 'react';
import { Button } from 'react-bootstrap';
import authService from '../authentication/AuthService';

const LoginButton: React.FC = () => {
  const handleLogin = () => {
    authService.login();
  };

  return (
    <Button onClick={handleLogin} variant="outline" style={{ color: "#7848F4" }} className="ms-1 login-btn">
      Log In
    </Button>
  );
};

export default LoginButton;
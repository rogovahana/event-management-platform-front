import React from 'react';
import { Button } from 'react-bootstrap';
import authService from '../authentication/AuthService'; // Make sure to update the path as necessary

const SignUpButton: React.FC = () => {
  const handleSignUp = () => {
    authService.signup();
  };

  return (
    <Button onClick={handleSignUp} variant="primary" style={{ backgroundColor: "#7848F4", borderColor: "#7848F4" }} className="ms-1">
      Sign Up
    </Button>
  );
};

export default SignUpButton;
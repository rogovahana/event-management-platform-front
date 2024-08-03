import React from 'react';
import { Button } from 'react-bootstrap';
import { useAuth0 } from '@auth0/auth0-react';

const SignUpButton: React.FC = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = () => {
    loginWithRedirect({
      screen_hint: 'signup' as unknown as string, 
    } as any); 
  };

  return (
    <Button
      onClick={handleSignUp}
      variant="primary"
      style={{ backgroundColor: "#7848F4", borderColor: "#7848F4" }}
      className="ms-1"
    >
      Sign Up
    </Button>
  );
};

export default SignUpButton;

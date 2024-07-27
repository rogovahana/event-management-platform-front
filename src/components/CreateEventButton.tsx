import React, { useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const CreateEventButton: React.FC = () => {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      // Check if the user just logged in and should be redirected
      const appState = JSON.parse(sessionStorage.getItem('auth0_appState') || '{}');
      if (appState?.returnTo) {
        navigate(appState.returnTo);
        sessionStorage.removeItem('auth0_appState'); // Clean up the session storage
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      console.log('User is not authenticated, redirecting to login...');
      sessionStorage.setItem('auth0_appState', JSON.stringify({ returnTo: '/create-event' }));
      await loginWithRedirect({
        appState: { returnTo: '/create-event' }
      });
    } else {
      console.log('User is authenticated, navigating to create event...');
      navigate('/create-event');
    }
  };

  return (
    <Button
      size="lg"
      className="create-event-button"
      style={{ backgroundColor: "#7848F4" }}
      onClick={handleClick}
    >
      <i className="fas fa-plus-circle mr-2"></i> Create an Event
    </Button>
  );
};

export default CreateEventButton;

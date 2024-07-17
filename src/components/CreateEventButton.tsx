import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../authentication/AuthContext';

const CreateEventButton: React.FC = () => {
  const { user, isSignedUp } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!user) {
      if (!isSignedUp) {
        navigate('/sign-up');
      } else {
        navigate('/sign-in');
      }
    } else {
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

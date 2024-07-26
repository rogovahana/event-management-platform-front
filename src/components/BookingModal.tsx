// needs to have auth0
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';

interface BookingModal {
  show: boolean;
  handleClose: () => void;
}

const BookingModal: React.FC<BookingModal> = ({ show, handleClose }) => {
  const [isSignUp, setIsSignUp] = useState(true);

  const handleFormSwitch = () => {
    setIsSignUp(!isSignUp);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{isSignUp ? 'Sign Up' : 'Log In'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {isSignUp ? (
            <>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>

              <Form.Group controlId="formBasicPasswordConfirm">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="password" placeholder="Confirm Password" required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Sign Up
              </Button>
            </>
          ) : (
            <>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" required />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" required />
              </Form.Group>

              <Button variant="primary" type="submit">
                Log In
              </Button>
            </>
          )}

          <div className="mt-3">
            {isSignUp ? (
              <p>
                Already have an account?{' '}
                <Button variant="link" onClick={handleFormSwitch}>
                  Log In
                </Button>
              </p>
            ) : (
              <p>
                Don't have an account?{' '}
                <Button variant="link" onClick={handleFormSwitch}>
                  Sign Up
                </Button>
              </p>
            )}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookingModal;

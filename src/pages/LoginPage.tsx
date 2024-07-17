import React, { useState } from 'react';
import loginImg from '../assets/login_img.jpg';
import googleLogo from '../assets/google_logo.png';
import { Form, Button } from 'react-bootstrap';
import { fetchEvents } from '../services/UpcomingEventService';
import { toast } from 'react-toastify';
import './AuthPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let isFormValid = true;

    if (!email.trim()) {
      setEmailError('Email is required.');
      isFormValid = false;
    } else {
      setEmailError('');
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      isFormValid = false;
    } else {
      setPasswordError('');
    }

    if (!isFormValid) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Login successful!');
        setEmail('');
        setPassword('');
        setSubmitError('');
        const events = await fetchEvents();
        const eventTitles = events.map((event: any) => event.title).join(', ');
        toast.success(`Upcoming events: ${eventTitles}`);
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Failed to log in');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-100 d-flex justify-content-center align-content-center">
      <div className="main-content w-md-75 w-90 my-md-3">
        <div className="sub-content">
          <h2>
            Event<span style={{ color: "#7848F4" }}>Hive</span>
          </h2>
          <h3>Log In to Event Hive</h3>
          <Form className="form" onSubmit={handleFormSubmit}>
            <div>
              <Form.Label htmlFor="formEmail">EMAIL</Form.Label>
              <Form.Control
                type="email"
                id="formEmail"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError('');
                }}
                isInvalid={!!emailError}
              />
              <Form.Control.Feedback type="invalid">{emailError}</Form.Control.Feedback>
            </div>

            <div>
              <Form.Label htmlFor="formPassword">PASSWORD</Form.Label>
              <Form.Control
                type="password"
                id="formPassword"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setPasswordError('');
                }}
                isInvalid={!!passwordError}
              />
              <Form.Control.Feedback type="invalid">{passwordError}</Form.Control.Feedback>
            </div>

            <Button className="w-50 mx-auto" type="submit" disabled={submitting}>
              {submitting ? 'Logging In...' : 'Log in'}
            </Button>

            {submitError && <div className="text-danger text-center mt-2">{submitError}</div>}

            <div className="text-center">Or</div>

            <Button type="button" className="google-btn">
              <img src={googleLogo} alt="Google" className="google-logo" />
              Log in with Google
            </Button>
          </Form>
        </div>
      </div>
      <div className="main-img d-none d-lg-block">
        <img src={loginImg} alt="Event" className="image" />
      </div>
    </div>
  );
};

export default LoginPage;

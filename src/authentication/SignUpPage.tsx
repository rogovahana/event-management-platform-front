import React, { useState } from 'react';
import signImg from '../assets/sign_img.jpg';
import googleLogo from '../assets/google_logo.png';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import './AuthPage.css';

const SignUpPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { setSignedUp } = useAuth();
  const navigate = useNavigate();

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    let isFormValid = true;

    if (!name.trim()) {
      setNameError('Name is required.');
      isFormValid = false;
    } else {
      setNameError('');
    }

    if (!email.trim()) {
      setEmailError('Email is required.');
      isFormValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address.');
      isFormValid = false;
    } else {
      setEmailError('');
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and contain at least 1 uppercase letter, 1 number, and 1 symbol.'
      );
      isFormValid = false;
    } else {
      setPasswordError('');
    }

    if (!isFormValid) {
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        alert('Sign up successful!');
        setSignedUp(true);
        navigate('/sign-in');
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.message || 'Failed to sign up');
      }
    } catch (error) {
      setSubmitError('An error occurred. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    if (password.length < 8) {
      return false;
    }

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    const symbolRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;

    if (!uppercaseRegex.test(password) || !numberRegex.test(password) || !symbolRegex.test(password)) {
      return false;
    }

    return true;
  };

  return (
    <div className="w-100 d-flex justify-content-center align-content-center">
      <div className="main-img d-none d-lg-block">
        <img src={signImg} alt="Event" className="image" />
      </div>
      <div className="main-content w-md-75 w-90 my-md-3">
        <div className="sub-content">
          <h2>
            Event<span style={{ color: "#7848F4" }}>Hive</span>
          </h2>
          <h3>Sign up to Event Hive</h3>
          <Form className="form" onSubmit={handleFormSubmit}>
            <div>
              <Form.Label htmlFor="formName"></Form.Label>
              <Form.Control
                type="text"
                id="formName"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setNameError('');
                }}
                isInvalid={!!nameError}
              />
              <Form.Control.Feedback type="invalid">{nameError}</Form.Control.Feedback>
            </div>

            <div>
              <Form.Label htmlFor="formEmail"></Form.Label>
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
              <Form.Label htmlFor="formPassword"></Form.Label>
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
              {submitting ? 'Signing Up...' : 'Sign Up'}
            </Button>

            {submitError && <div className="text-danger text-center mt-2">{submitError}</div>}

            <div className="text-center">Or</div>

            <Button type="button" className="google-btn">
              <img src={googleLogo} alt="Google" className="google-logo" />
              Sign up with Google
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;

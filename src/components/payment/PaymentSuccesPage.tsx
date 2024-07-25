import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './PaymentSuccesPage.css';

const PaymentSuccessPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="payment-success-page">
      <h1>Your payment was successful!</h1>
      <p>Thank you for your purchase.</p>
      <Button variant="primary" onClick={() => navigate('/')}>Go to Home</Button>
    </div>
  );
};

export default PaymentSuccessPage;

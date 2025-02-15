import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '../../contexts/ThemeContext';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { bookTickets } from '../../services/ticketService';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

interface PaymentFormProps {
  eventId: string;
  numTickets: number;
  onSuccess: () => void;
  onError: (error: string) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ eventId, numTickets, onSuccess, onError }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      onError('Stripe or Elements not loaded');
      return;
    }

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      onError('Card Element not found');
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        onError(error.message || 'An error occurred while creating the payment method');
      } else {
        const accessToken = await getAccessTokenSilently();
        await bookTickets(eventId, 1, numTickets, paymentMethod.id, accessToken); 
        onSuccess();
        navigate('/payment-success');
      }
    } catch (err) {
      onError('Failed to book tickets. Please try again later.');
    }
  };

  return (
    <Container className="payment-form-container mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className={`card p-4 shadow-sm ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}>
            <h3 className="mb-4 text-center">Payment Details</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="sr-only">Card Details</Form.Label>
                <CardElement 
                  options={{ 
                    style: { 
                      base: { 
                        color: theme === 'light' ? '#000' : '#fff',
                        fontSize: '16px',
                        '::placeholder': { color: theme === 'light' ? '#ccc' : '#666' }
                      } 
                    } 
                  }} 
                />
              </Form.Group>
              <Button 
                variant={theme === 'light' ? 'dark' : 'light'} 
                type="submit" 
                className="w-100 mt-3" 
                disabled={!stripe}
              >
                Pay
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;

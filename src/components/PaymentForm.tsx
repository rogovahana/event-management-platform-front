import React from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useTheme } from '../contexts/ThemeContext';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import { bookTickets } from '../services/ticketService';

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
        await bookTickets(eventId, numTickets, paymentMethod.id);
        onSuccess();
      }
    } catch (err) {
      onError('Failed to book tickets. Please try again later.');
    }
  };

  return (
    <Container className="payment-form-container mt-4">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <div className="card p-4 shadow-sm">
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

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { bookTickets } from '../services/ticketService';
import Navbari from '../components/Navbar';

const TicketBookingForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [numTickets, setNumTickets] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingError('');
    setBookingSuccess(false);

    if (!eventId) {
      setBookingError('Invalid event ID');
      return;
    }

    try {
      await bookTickets(eventId, numTickets);
      setBookingSuccess(true);
    } catch (error) {
      console.error('Failed to book tickets', error);
      setBookingError('Failed to book tickets. Please try again later.');
    }
  };

  return (
    <>
      <Navbari />
      <div className="ticket-booking-container my-5">
        <h1 className="text-center mb-4">Book Tickets</h1>
        <form onSubmit={handleFormSubmit} className="ticket-booking-form">
          <div className="form-group mb-3">
            <label htmlFor="numTickets">Number of Tickets</label>
            <input
              type="number"
              id="numTickets"
              value={numTickets}
              onChange={(e) => setNumTickets(Number(e.target.value))}
              className="form-control"
              min={1}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Book Tickets</button>
          {bookingSuccess && <p className="success-message">Tickets booked successfully!</p>}
          {bookingError && <p className="error-message">{bookingError}</p>}
        </form>
      </div>
    </>
  );
};

export default TicketBookingForm;

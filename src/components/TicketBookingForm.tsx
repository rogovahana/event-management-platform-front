import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbari from './Navbar/Navbar';
import PaymentForm from './payment/PaymentForm';  

const TicketBookingForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const [numTickets, setNumTickets] = useState<number>(1);
  const [bookingSuccess, setBookingSuccess] = useState<boolean>(false);
  const [bookingError, setBookingError] = useState<string>('');

  const handleBookingSuccess = () => {
    setBookingSuccess(true);
    setBookingError('');
  };

  const handleBookingError = (error: string) => {
    setBookingError(error);
    setBookingSuccess(false);
  };

  if (!eventId) {
    return <p>Invalid event ID</p>;
  }

  return (
    <>
      <Navbari />
      <div className="container my-5">
        <h1 className="text-center mb-4">Book Tickets</h1>
        <div className="card p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="h4 mb-3">Select Number of Tickets</h2>
            <div className="form-group mb-3">
              <label htmlFor="numTickets" className="form-label">Number of Tickets</label>
              <input
                type="number"
                id="numTickets"
                value={numTickets}
                onChange={(e) => setNumTickets(Number(e.target.value))}
                className="form-control"
                min={1}
                required
              />
            </div>
          </div>
          <PaymentForm
            eventId={eventId}
            numTickets={numTickets}
            onSuccess={handleBookingSuccess}
            onError={handleBookingError}
          />
          {bookingSuccess && <p className="text-success mt-3">Tickets booked successfully!</p>}
          {bookingError && <p className="text-danger mt-3">{bookingError}</p>}
        </div>
      </div>
    </>
  );
};

export default TicketBookingForm;

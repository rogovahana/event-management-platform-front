import React, { useEffect, useState } from 'react';
import { fetchBookedTickets, cancelTicket } from '../../services/ticketService';
import Navbari from '../../components/Navbar/Navbar';
import UpdateTicketModal from '../../components/UpdateTicketModal';

const BookedTicketsPage: React.FC = () => {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);

  useEffect(() => {
    const getTickets = async () => {
      try {
        const data = await fetchBookedTickets();
        setTickets(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch booked tickets', error);
        setLoading(false);
      }
    };
    getTickets();
  }, []);

  const handleCancel = async (ticketId: string) => {
    try {
      await cancelTicket(ticketId);
      setTickets(tickets.filter(ticket => ticket.id !== ticketId));
      alert('Ticket canceled successfully');
    } catch (error) {
      console.error('Failed to cancel ticket', error);
      alert('Failed to cancel ticket');
    }
  };

  const handleUpdateClick = (ticket: any) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedTicket(null);
  };

  const handleTicketUpdate = async () => {
    try {
      const data = await fetchBookedTickets();
      setTickets(data);
    } catch (error) {
      console.error('Failed to fetch booked tickets', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <>
      <Navbari />
      <div className="container my-5">
        <h1 className="text-center mb-4">My Booked Tickets</h1>
        {tickets.length === 0 ? (
          <p className="text-center">No tickets booked</p>
        ) : (
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Number of Tickets</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.event.name}</td>
                  <td>{ticket.event.date}</td>
                  <td>{ticket.numTickets}</td>
                  <td>
                    <button
                      className="btn btn-primary btn-sm me-2"
                      onClick={() => handleUpdateClick(ticket)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleCancel(ticket.id)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedTicket && (
        <UpdateTicketModal
          show={showModal}
          onClose={handleModalClose}
          ticket={selectedTicket}
          onUpdate={handleTicketUpdate}
        />
      )}
    </>
  );
};

export default BookedTicketsPage;

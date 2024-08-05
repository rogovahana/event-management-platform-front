import React, { useState, useEffect } from 'react';
import { updateBookedTicket } from '../services/ticketService';
import { useAuth0 } from '@auth0/auth0-react';

interface UpdateTicketModalProps {
  show: boolean;
  onClose: () => void;
  ticket: any;
  onUpdate: () => void;
}

const UpdateTicketModal: React.FC<UpdateTicketModalProps> = ({ show, onClose, ticket, onUpdate }) => {
  const [numTickets, setNumTickets] = useState(ticket ? ticket.numTickets : 1);
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (ticket) {
      setNumTickets(ticket.numTickets);
    }
  }, [ticket]);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const accessToken = await getAccessTokenSilently();
      await updateBookedTicket(ticket.id, numTickets, accessToken);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Failed to update ticket', error);
      alert('Failed to update ticket');
    } finally {
      setLoading(false);
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h5 className="modal-title">Update Ticket</h5>
          <button type="button" className="close" onClick={onClose}>
            <span>&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="numTickets">Number of Tickets</label>
            <input
              type="number"
              id="numTickets"
              value={numTickets}
              onChange={(e) => setNumTickets(parseInt(e.target.value))}
              className="form-control"
              min="1"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
          <button type="button" className="btn btn-primary" onClick={handleUpdate} disabled={loading}>
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateTicketModal;

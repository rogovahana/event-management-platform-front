const API_URL = 'http://backend-api';

export const bookTickets = async (eventId: string, numTickets: number) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ numTickets })
    });
    if (!response.ok) {
      throw new Error('Failed to book tickets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error booking tickets:', error);
    throw error;
  }
  
};

  export const fetchBookedTickets = async () => {
    try {
      const response = await fetch(`${API_URL}/tickets`);
      return await response.json();
    } catch (error) {
      console.error('Error fetching booked tickets:', error);
      throw error;
    }
  };

  export const cancelTicket = async (ticketId: string) => {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to cancel ticket');
      }
      return await response.json();
    } catch (error) {
      console.error('Error canceling ticket:', error);
      throw error;
    }
  };

  export const updateBookedTicket = async (ticketId: string, numTickets: number) => {
    try {
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ numTickets })
      });
      if (!response.ok) {
        throw new Error('Failed to update ticket');
      }
      return await response.json();
    } catch (error) {
      console.error('Error updating ticket:', error);
      throw error;
    }
  };


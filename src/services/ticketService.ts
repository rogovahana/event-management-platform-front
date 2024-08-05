const API_URL = 'https://localhost:7136/api/Ticket';


export const bookTickets = async (eventId: string, type: number, quantity: number, stripeToken: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ EventId: eventId, Type: type, Quantity: quantity, StripeToken: stripeToken })
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


export const fetchBookedTickets = async (token: string) => {
  try {
    const response = await fetch(API_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) {
      throw new Error('Failed to fetch booked tickets');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching booked tickets:', error);
    throw error;
  }
};

export const cancelTicket = async (ticketId: string, token: string) => {
  try {
    const response = await fetch(`${API_URL}/${ticketId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
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


export const updateBookedTicket = async (ticketId: string, quantity: number, token: string) => {
  try {
    const response = await fetch(`${API_URL}/${ticketId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ quantity })
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

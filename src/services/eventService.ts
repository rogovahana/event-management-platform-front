const API_URL = 'http://your-backend-api-url';

export const fetchEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/events`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: 'DELETE'
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};
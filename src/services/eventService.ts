const API_URL = 'https://localhost:7136/api/Event';

export const fetchEvents = async() => {
  try {
    const response = await fetch(`${API_URL}?pageNumber=${1}&pageSize=${15}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId: string) => {
  try {
    const token = sessionStorage.getItem('accessToken');
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    });
    console.log(response);
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

export const updateEvent = async (updatedEvent: any) => {
  const token = sessionStorage.getItem('accessToken');
  const response = await fetch(`https://localhost:7136/api/Event/${updatedEvent.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      title: updatedEvent.title,
      description: updatedEvent.description,
      startDate: new Date(updatedEvent.startDate).toISOString(),
    }),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
};
